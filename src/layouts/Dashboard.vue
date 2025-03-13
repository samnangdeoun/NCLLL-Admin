<template>
  <div class="flex flex-col w-full h-screen justify-center bg-gray-100">
    <div class="flex justify-center items-start h-[85vh] min-w-full p-4 overflow-scroll">
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
