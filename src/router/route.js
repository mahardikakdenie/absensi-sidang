import adminDashboard from '@/router/admin-dashboard/index'
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
        name: 'Home',
        path: '/',
        component: () => import('@/views/pages/index.vue'),
        meta: {
          breadcrumb: [],
        },
      },
      ...adminDashboard,
      {
        path: "/calender",
        name: "calender",
        component: () => import("@/views/index.vue"),
      },
    ],
  },
];

export default routes;
