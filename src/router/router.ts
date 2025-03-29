import { createRouter, createWebHistory } from "vue-router";
import { getCookie } from "../scripts/cookie/cookie.ts";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/layouts/Dashboard.vue"),
    redirect: "/event",
    meta: { title: "Dashboard" },
    children: [
      {
        path: "/event",
        name: "Event",
        component: () => import("../views/event/Event.vue"),
        meta: { title: "Overview", auth: true },
      },
      {
        path: "/partner",
        name: "Partner",
        component: () => import("../views/partners/Partner.vue"),
        meta: { title: "Partner", auth: true },
      },
      {
        path: "/resource",
        name: "Resource",
        component: () => import("../views/resource/Resource.vue"),
        meta: { title: "Resource", auth: true },
      },
      {
        path: "/overview",
        name: "Overview",
        component: () => import("../views/overview/Overview.vue"),
        meta: { title: "Overview", auth: true },
      },
      {
        path: "/options",
        name: "Options",
        component: () => import("../views/options/Options.vue"),
        meta: { title: "Options", auth: true },
      },
      {
        path: "/news",
        name: "News",
        component: () => import("../views/news/News.vue"),
        meta: { title: "News", auth: true },
      },
      {
        path: "/member",
        name: "Member",
        component: () => import("../views/member/Member.vue"),
        meta: { title: "Member", auth: true },
      },
      {
        path: "/news",
        name: "News",
        component: () => import("@/views/news/News.vue"),
        meta: { title: "News", auth: true },
      },
      {
        path: "/ministry",
        name: "Ministry",
        component: () => import("@/views/resource/ministry/Ministry.vue"),
        meta: { title: "Ministry", auth: true },
      },
      {
        path: "/banner",
        name: "Banner",
        component: () => import("@/views/banner/Banner.vue"),
        meta: { title: "Banner", auth: true },
      },
    ]
  },
  {
    path: "/content",	
    name: "Content",
    component: () => import("@/views/content/Content.vue"),
    meta: { title: "Content", auth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
    meta: { title: "Login" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/Error404.vue"),
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const userToken = getCookie("userToken");

  if (userToken) {
    if (to.name === "Login") {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    if (to.meta.auth) {
      next({ name: "Login" });
    } else {
      next();
    }
  }
});

export default router;

