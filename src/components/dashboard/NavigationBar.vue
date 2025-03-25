<template>
  <nav
    class="bg-gray-50 flex items-center justify-between px-4 fixed z-30 top-0 bg-background/80 backdrop-blur-lg border-border"
    :style="{ width: store.navWidth, height: `${store.navHeight}px`, opacity: store.sidebarExpanded ? 1 : 0 }">
    <div class="flex">
      <h1 class="text-lg font-semibold">{{ route.meta.title }}</h1>
      <!-- <GlobalSearch/> -->
    </div>
    <div class="flex">
      <!-- <DarkMode /> -->
      <Icon icon="radix-icons:github-logo" class="ml-3" />
      <Icon icon="radix-icons:twitter-logo" class="ml-3" />
      <Icon icon="radix-icons:linkedin-logo" class="ml-3" />
      <!-- <UserNavigation class="ml-3" /> -->
      <Icon icon="radix-icons:gear" class="ml-3" />
    </div>
  </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue'
// import DarkMode from "@/components/DarkMode.vue";
import { useAppStore } from "../../stores/useAppConfig";
// import GlobalSearch from '../GlobalSearch.vue';
// import UserNavigation from '../UserNavigation.vue';
import { ref } from "vue";
import { useRoute } from 'vue-router';

// Init store
const store = useAppStore();
const route = useRoute();

console.log(route);
</script>
