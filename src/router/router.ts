import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../layouts/Dashboard.vue"),
    redirect: "/event",
    meta: { title: "Dashboard" },
    children: [
      {
        path: "/event",
        name: "Event",
        component: () => import("../views/event/Event.vue"),
        meta: { title: "Overview" },
      },
      {
        path: "/partner",
        name: "Partner",
        component: () => import("../views/partners/Partner.vue"),
        meta: { title: "Partner" },
      },
      {
        path: "/resource",
        name: "Resource",
        component: () => import("../views/resource/Resource.vue"),
        meta: { title: "Resource" },
      },
      {
        path: "/overview",
        name: "Overview",
        component: () => import("../views/overview/Overview.vue"),
        meta: { title: "Overview" },
      },
      {
        path: "/news",
        name: "News",
        component: () => import("../views/news/News.vue"),
        meta: { title: "News" },
      }
    ]
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

export default router;

