const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login/index.vue')
  },
  {
    path: "/admin",
    name: "Layout",
    redirect: "/",
    component: () => import("@/Layout/index.vue"),
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('@/views/pages/index.vue'),
        meta: {
          breadcrumb: [],
        },
      },
      {
        path: "/calender",
        name: "calender",
        component: () => import("@/views/index.vue"),
      },
    ],
  },
];

export default routes;
