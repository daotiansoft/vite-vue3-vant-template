// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "~pages";

// 路由配置
const routes = [
  ...generatedRoutes,
  // 如果有些特殊路由需要手动配置，可以在这里添加
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
