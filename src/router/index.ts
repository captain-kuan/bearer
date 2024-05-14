import { path } from "@tauri-apps/api";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      redirect: "/workspace",
      component: () => import("@/layouts/main.vue"),
      children: [
        {
          path: "/workspace",
          redirect: "/workspace/collection",
          component: () => import("@/layouts/workspace.vue"),
          children: [
            {
              path: "/workspace/collection",
              components: {
                menu: () => import("@/views/collection/menu.vue"),
                main: () => import("@/views/collection/main.vue"),
              },
            },
            {
              path: "/workspace/:api",
              name: "CollectionSender",
              components: {
                menu: () => import("@/views/collection/menu.vue"),
                main: () => import("@/views/collection/api.vue"),
              },
            },
          ],
        },
      ],
    },
  ],
  history: createWebHashHistory(),
});

export default router;
