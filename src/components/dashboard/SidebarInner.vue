<template>
  <div
    class="bg-gray-50 bg-background/80 rounded-ee-3xl transition-all duration-400 h-screen overflow-hidden fixed z-50"
    :style="{ width: `${store.wrapperWidth}px` }"
  >
    <div class="relative h-full flex flex-col justify-between ">
      <div>
        <div class="mb-[4.5rem]">
          <div
            class="p-[1rem] flex fixed z-10 items-center justify-center"
            :style="{
              width: `${
                store.sidebarExpanded
                  ? store.wrapperWidth
                  : store.wrapperLeftOffset
              }px`,
            }"
          >
            <transition name="fade" class="relative">
              <img
                v-show="store.sidebarExpanded"
                src="@/assets/images/NCLLL.jpg"
                alt="NCLLL"
                class="w-[7rem]"
              />
            </transition>
            <transition name="fade" class="absolute">
              <button
                variant="outline"
                class="-right-4 top-1/2 -translate-y-1/2 bg-green-600 rounded-full p-[6px] w-8 h-8 transition-all duration-200 bg-mainPrimary text-white flex justify-center items-center"
                :class="
                  store.sidebarExpanded
                    ? ''
                    : '-right-1 top-14 transition-shadow'
                "
                @click="toggleSidebar"
              >
                <ChevronLeft
                  :class="!store.sidebarExpanded && 'rotate-180 text-black'"
                />
              </button>
            </transition>
          </div>
        </div>
        <nav class="bg-white h-full">
          <div
            v-for="menu in menus"
            :key="menu.key"
            class="transition-all"
            :class="store.sidebarExpanded ? '' : ''"
          >
            <ul
              class="flex flex-col justify-start tracking-tighter pt-[4rem] text-gray-900 font-extrabold text-2xl font-noto_sans_khmer"
            >
              <li
                v-for="(tab, index) in menu.routes"
                :key="index"
                class="pl-[3rem] py-[0.4rem] font-bold"
                @click="handleNavigate(tab.path)"
                :class="{
                  'text-green-600 bg-gray-200': activeTab === tab.title,
                }"
              >
                {{ tab.title }}
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div
        class="transition-all duration-400 py-4"
        :class="store.sidebarExpanded ? 'opacity-100' : 'opacity-0'"
      >
        <p class="text-xs text-foreground/50 text-center">
          &copy; {{ currentYear }} National LifeLong Learning
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Button } from "../components/ui/button";
// import router from "../router";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { APP_MENU } from "../../config/app.js";
import { ChevronLeft } from "lucide-vue-next";
import { useAppStore } from "../../stores/useAppConfig.js";

// Init store
const store = useAppStore();
const router = useRouter();
const activeTab = ref(router.currentRoute.value.path.split('/').pop());
const currentYear = new Date().getFullYear();

// Methods
const handleNavigate = (path) => {
  activeTab.value = path;
  router.push(path);
  if (window.innerWidth < 1025) {
    store.toggleSidebar();
  }
};

const toggleSidebar = () => {
  store.toggleSidebar();
};

// Computed
const menus = computed(() =>
  Object.entries(APP_MENU).map(([key, value]) => ({
    key,
    name: value.name,
    routes: value.routes.map((r) => ({
      ...r,
      active: `/dashboard/${r.path}` === router.path,
    })),
  }))
);
</script>
