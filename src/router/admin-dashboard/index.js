const router = [
    {
        name: 'Error',
        path: '/error',
        component: () => import('@/views/error.vue'),
    },
    {
        name: 'AdminPage',
        path: '/admin',
        component: () => import('@/Layout/AdminPage.vue'),
        children: [
            {
                name: 'Admin Project Dashboard',
                path: 'dashboard',
                component: () => import('@/views/dashboard/project.vue'),
                meta: {
                    groupParent: 'Home Dashboard',
                    showDatePicker: true,
                },
            },
            {
                name: 'Project',
                path: 'project',
                component: () => import('@/views/pages/admin/project.vue'),
                meta: {
                    groupParent: 'Project List',
                    showDatePicker: true,
                },
            },
            {
                name: 'Attendance List',
                path: 'attendance-list',
                component: () => import('@/views/pages/admin/attendance-list.vue'),
                meta: {
                    groupParent: 'Attendance List',
                    showDatePicker: true,
                }
            },
            {
                name: 'User',
                path: 'user',
                component: () => import('@/views/pages/admin/user.vue'),
                meta: {
                    groupParent: 'User List',
                    showDatePicker: true,
                }
            },
            {
                name: 'Admin Division',
                path: 'division',
                component: () => import('@/views/pages/admin/division.vue'),
                meta: {
                    groupParent: 'List Division',
                    showDatePicker: true,
                }
            }
        ],
    }
];

export default router;
