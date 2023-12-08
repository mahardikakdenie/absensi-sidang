const router = [
    {
        name: 'Error',
        path: '/error',
        component: () => import('@/views/error.vue'),
    },
    {
        name: 'Admin Project Dashboard',
        path: '/admin/dashboard',
        component: () => import('@/views/dashboard/project.vue'),
        meta: {
            groupParent: 'Home Dashboard',
            showDatePicker: true,
        },
    },
    {
        name: 'Project',
        path: '/admin/project',
        component: () => import('@/views/pages/admin/project.vue'),
        meta: {
            groupParent: 'Project List',
            showDatePicker: true,
        },
    },
    {
        name: 'Attendance List',
        path: '/admin/attendance-list',
        component: () => import('@/views/pages/admin/attendance-list.vue'),
        meta: {
            groupParent: 'Attendance List',
            showDatePicker: true,
        }
    },
    {
        name: 'User',
        path: '/admin/user',
        component: () => import('@/views/pages/admin/user.vue'),
        meta: {
            groupParent: 'User List',
            showDatePicker: true,
        }
    },
    {
        name: 'Admin Division',
        path: '/admin/division',
        component: () => import('@/views/pages/admin/division.vue'),
        meta: {
            groupParent: 'List Division',
            showDatePicker: true,
        }
    }
];

export default router;
