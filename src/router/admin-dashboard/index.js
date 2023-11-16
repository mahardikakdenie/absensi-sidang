const router = [
    {
        name: 'Project Dashboard',
        path: '/admin/dashboard',
        component: () => import('@/views/dashboard/project.vue'),
        meta: {
            groupParent: 'Home Dashboard'
        },
    },
    {
        name: 'Project',
        path: '/admin/project',
        component: () => import('@/views/pages/admin/project.vue'),
        meta: {
            groupParent: 'Project List',
        },
    },
    {
        name: 'Attendance List',
        path: '/admin/attendance-list',
        component: () => import('@/views/pages/admin/attendance-list.vue'),
        meta: {
            groupParent: 'Attendance List'
        }
    },
    {
        name: 'User',
        path: '/admin/user',
        component: () => import('@/views/pages/admin/user.vue'),
        meta: {
            groupParent: 'User List'
        }
    }
];

export default router;
