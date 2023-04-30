import { createRouter, createWebHistory } from "vue-router";
import { loadLayoutMiddleware } from "@/router/middleware/loadLayout.middleware";
import { RouteNamesEnum } from "@/router/router.types";
import { AppLayoutsEnum } from "@/layouts/layouts.types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNamesEnum.home,
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: "/profile",
      name: RouteNamesEnum.profile,
      component: () => import("@/pages/ProfilePage.vue"),
    },
    {
      path: "/login",
      name: RouteNamesEnum.login,
      component: () => import("@/pages/LoginPage.vue"),
      meta: {
        layout: AppLayoutsEnum.login,
      },
    },
  ],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
