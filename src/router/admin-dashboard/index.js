const router = [
    {
        name: "home",
        path: "home",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
            groupParents: 'Home Dashboard'
        },
    },
    {
        name: 'CRM Dashboard',
        path: 'crm',
        component: () => import('@/views/dashboard/crm.vue'),
    },
    {
        name: 'Ecommerce Dashboard',
        path: 'ecommerce',
        component: () => import('@/views/dashboard/ecommerce.vue'),
    },
    {
        name: 'Bangking Dashboard',
        path: 'banking',
        component: () => import('@/views/dashboard/banking.vue'),
    },
    {
        name: 'Project Dashboard',
        path: 'project',
        component: () => import('@/views/dashboard/project.vue'),
        meta: {
            groupParent: 'Home Dashboard'
        },
    },
];

export default router;
