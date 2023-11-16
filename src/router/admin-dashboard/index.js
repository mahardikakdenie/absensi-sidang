const router = [
    {
        name: 'Project Dashboard',
        path: '/project',
        component: () => import('@/views/dashboard/project.vue'),
        meta: {
            groupParent: 'Home Dashboard'
        },
    },
];

export default router;
