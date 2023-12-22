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
        name: 'List Projects',
        path: '/projects',
        component: () => import('@/views/pages/divisions'),
      },
      {
        name: 'List SubProjects',
        path: '/projects/:division_id',
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
      {
        path: '/attendance/:type/:project_id',
        name: 'Attendance',
        component: () => import('@/views/pages/attendance.vue'),
        meta: {
        }
      },
      {
        path: '/attendance-log/division/:division_id/project/:project_id',
        name: 'Attendance Logs',
        component: () => import('@/views/pages/attandance-log.vue'),
      }
    ],
  },
];

export default routes;
