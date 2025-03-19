<template>
  <div class="flex flex-col items-center justify-center h-screen border-2">
    <div class="w-1/3 shadow-lg rounded-3xl">
      <AuthFormHeader />
      <form class="relative rounded-b-3xl flex flex-col bg-white p-10">
        <h1 class="text-2xl font-bold mb-5">{{ $t("admin_login") }}</h1>
        <div class="mb-5 w-full">
          <label for="email" class="block">{{ $t("username") }}</label>
          <input type="text" v-model="loginForm.username"
            class="font-sans w-full bg-gray-50 px-4 py-2 border rounded-md" />
        </div>
        <div class="w-full mb-5">
          <label for="password" class="block">{{ $t("password") }}</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="loginForm.password"
              class="font-sans w-full bg-gray-50 px-4 py-2 border rounded-md" />
            <button type="button" @click="toggleShowPassword" class="absolute right-2 top-2">
              <Icon :icon="showPassword ? 'mdi:eye' : 'mdi:eye-off'" />
            </button>
          </div>
        </div>
        
        <div class="mt-5">
          <button @click="router.push({ name: 'dashboard' })"
            class="w-full bg-green-500 text-black font-bold py-2 px-4 rounded-md">
            {{ $t("login") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Swal from 'sweetalert2'
import { Icon } from "@iconify/vue";
import type LoginModel from "../../scripts/model/auth/Auth.ts";
import { useI18n } from "vue-i18n";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
// import { setCookie } from '../../scripts/handler/cookie.ts';
import type { Emitter } from 'mitt';
import { useToast } from '../../components/ui/toast/use-toast';

const { t } = useI18n();
const router = useRouter();
const { toast } = useToast();
const emitter = inject<Emitter<{ [event: string]: unknown }>>('emitter');
const loginForm = ref<LoginModel>({} as LoginModel);
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async (e: { preventDefault: () => void }) => {
  try {
    console.log(loginForm.value);
    // e.preventDefault();
    // setTimeout(() => {
    //   router.push({ name: "dashboard" });
    // }, 500);
    // emitter?.emit("stateLoading", true);
    // const { message, data, statusCode } = await userLoginHandler(loginForm.value);
    // setTimeout(() => {
    //   emitter?.emit("stateLoading", false);
    //   if (statusCode !== 200 || data && data == null) {
    //     toast({
    //       title: t("error"),
    //       variant: "destructive",
    //       description: message as string,
    //     });
    //   } else {
    //     toast({
    //       variant: "success",
    //       title: t("success"),
    //       description: message as string,
    //     });

    //   }
    // }, 1000);
  } catch (error) {
    console.log(error);
  }
};
</script>