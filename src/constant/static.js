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
		isHeadr: true,
		title: 'Admin',
	},
    {
        title: 'Project',
        icon: 'eos-icons:project-outlined',
        link: '/admin/project',
    },
    {
        title: 'User',
        icon: 'mdi:user-outline',
        link: '/admin/user'
    },
    {
        title: 'Attendance List',
        icon: 'gg:list',
        link: '/admin/attendance-list'
    },
    // Attendance System
	{
		isHeadr: true,
		title: 'Home Attendance System',
	},
	{
		title: 'Home',
		icon: 'heroicons-outline:home',
		link: '/',
	},
];
