export const formatInformations = [
	{
		colorCode: '#CE7722',
		label: 'Progress',
	},
	{
		colorCode: '#FFE5B4',
		label: 'Deviasi',
	},
];

export const menuItems = [
    // Admin
    {
        isHeader: true,
        title: 'Admin',
		link: null,
		allowedRoles: ['Admin', 'superadmin'],
    },
    {
		title: 'Divisi',
        icon: 'fluent:group-20-filled',
        link: '/admin/division',
        allowedRoles: ['superadmin', 'admin'],
    },
    {
		title: 'Project',
        icon: 'eos-icons:project-outlined',
        link: '/admin/project',
        allowedRoles: ['superadmin'],
    },
    {
		title: 'User',
        icon: 'mdi:user-outline',
        link: '/admin/user',
        allowedRoles: ['superadmin'],
    },
    {
		title: 'Attendance List',
        icon: 'gg:list',
        link: '/admin/attendance-list',
        allowedRoles: ['superadmin'],
    },
    // Attendance System
    {
		link: null,
		isHeader: true,
        title: 'Home Attendance System',
		allowedRoles: ['user', 'user_admin'],
    },
    {
		title: 'Home',
        icon: 'heroicons-outline:home',
        link: '/',
		allowedRoles: ['user', 'user_admin'],
    },
    {
		title: 'Projects',
        icon: 'grommet-icons:projects',
        link: '/divisions',
		allowedRoles: ['user', 'user_admin'],
    },
];


export const routeAccessRules = {
    '/admin/user': {
        'superadmin': true,
        'admin': false,
		'user': false,
    },
};
