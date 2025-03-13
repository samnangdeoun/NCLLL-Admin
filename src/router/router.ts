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

