<template>
  <div class="flex justify-center w-full h-screen bg-gray-200">
    <div class="flex w-full h-full">
      <!-- Sidebar -->
      <DashboardSidebar />

      <!-- Main Content Wrapper -->
      <div :style="{
        width: `calc(100% - ${store.wrapperLeftOffset}px)`,
        marginLeft: `${store.wrapperLeftOffset}px`,
      }">
        <!-- Header Navigation -->
        <DashboardNavbar />
        <div class="p-6 overflow-auto transition-all duration-300 " :style="{
          height: `calc(100% - ${store.navHeight}px)`,
          marginTop: `${store.navHeight}px`,
        }">
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "../stores/useAppConfig";
import DashboardSidebar from "../components/dashboard/Sidebar.vue";
import DashboardNavbar from "../components/dashboard/NavigationBar.vue";

const store = useAppStore();
</script>
