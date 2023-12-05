import adminRoute from '@/router/admin-dashboard/index.js'
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
      ...adminRoute,
      {
        name: 'Home',
        path: '/',
        component: () => import('@/views/pages/index.vue'),
        meta: {
          breadcrumb: [],
        },
      },
      {
        name: 'Projects',
        path: '/division/:division_id',
        component: () => import('@/views/pages/projects.vue'),
        meta: {
          groupParent: 'List Projects'
        },
      },
      {
        path: '/detail-project/:id',
        name: 'detail-project',
        component: () => import('@/views/pages/detail-project.vue'),
        meta: {
          groupParent: 'Project',
        }
      },
    ],
  },
];

export default routes;
