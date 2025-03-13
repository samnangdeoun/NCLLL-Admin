import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";
import { getCookie } from "../scripts/handler/cookie";
import { useRouter } from 'vue-router';
import { useMainStore } from "../stores/useMainStore";
import { useToast } from '../components/ui/toast/use-toast';
const { toast } = useToast();
const mainStore = useMainStore();
const router = useRouter();

export function useSocket(md5Hash) {
  const socket = ref(null);
  const messages = ref([]);

  onMounted(() => {
    socket.value = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
      {
        transports: ["websocket"],
      }
    );

    socket.value.on("connect", () => {
      console.log("Connected to WebSocket:", socket.value.id);
      const payment_response = sessionStorage.getItem("payment_response");
      if (!payment_response) {
        mainStore.onSetStateTimer(0);
        setTimeout(() => {
          router.push({ name: "overview" });
          return;
        }, 300);
      }
      const response = JSON.parse(payment_response);

      socket.value.emit("authenticate", {
        token: getCookie("userToken"),
        md5: response.md5,
      });
    });

    socket.value.on("authenticated", (data) => {
      if (data.success) {
        console.log("Successfully authenticated with WebSocket");
        toast({
          title: "Success",
          variant: "success",
          description: "WebSocket Authentication Successful",
        })
      } else {
        console.error("WebSocket authentication failed:", data.error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "WebSocket Authentication Failed",
        })
        mainStore.onSetStateTimer(0);
        setTimeout(() => {
          router.replace("/overview").then(() => {
            window.location.reload();
            sessionStorage.removeItem("payment_response");
          });
        }, 1000);
      }
    });

    socket.value.on("transactionCompleted", (data) => {
      console.log("Transaction completed:", data);
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction Completed",
      })
      mainStore.onSetStateTimer(0);
      router.replace("/overview").then(() => {
        window.location.reload();
        sessionStorage.removeItem("payment_response");
      });
    });
  });

  onUnmounted(() => {
    if (socket.value) {
      mainStore.onSetStateTimer(0);
      socket.value.disconnect();
    }
  });

  return { socket, messages };
}
