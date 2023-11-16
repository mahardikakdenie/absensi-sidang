const router = [
    {
        name: 'Project Dashboard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/project.vue'),
        meta: {
            groupParent: 'Home Dashboard'
        },
    },
    {
        name: 'Project',
        path: '/project',
        component: () => import('@/views/pages/admin/project.vue'),
        meta: {
            groupParent: 'Project List',
        },
    },
    {
        name: 'Attendance List',
        path: '/attendance-list',
        component: () => import('@/views/pages/admin/attendance-list.vue'),
        meta: {
            groupParent: 'Attendance List'
        }
    }
];

export default router;
