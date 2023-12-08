import { createRouter, createWebHistory } from "vue-router";

import routes from "./route";

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  base: import.meta.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

let isFirstLoad = false;

router.beforeEach((to, from, next) => {
  if (isFirstLoad) {
    next({
      path: '/login'
    });
  } else {
    if (!to.name) {
      next({
        path: '/error'
      });
    }
    const titleText = to?.name;
    const words = titleText?.split(" ");
    const titlePage = words.join(" ");
    document.title = "Absen  - " + titlePage;

    next();
  }
});


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
