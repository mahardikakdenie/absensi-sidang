<template>
	<div>
		<card>
			<data-table title="Project" btn-text="Buat Project" />
		</card>
	</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import division from '@/helpers/division';
import projectsApi from '@/helpers/projects.js';
import { useDataTableStore } from '@/store/data-table.js';
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const store = useDataTableStore();
const route = useRoute();

const user = computed(() => JSON.parse(localStorage.getItem('users')));
const roles = computed(() => user?.value?.roles);

const headers = [
	{
		label: 'Project Number',
		field: 'projectNo',
	},
	{
		label: 'Name',
		field: 'name',
	},
	{
		label: 'Address',
		field: 'address',
	},
	{
		label: 'Cost',
		field: 'cost',
	},
	{
		label: 'Actions',
		field: 'actions',
	},
];

const actions = [];
const divisionId = ref(null);
const fetchParams = computed(() => {
    return {
        division_id: route?.query?.divison_id,
    }
})

const getData = () => {
    const params = {
        division_id: divisionId?.value ?? null,
        division_ids: divisionsIds?.value ?? null,
    };
	const callback = (response) => {
		const projects = response?.data?.data;
		store.setData(projects);
	};

	const err = (e) => {
		console.warn('e => ', e);
	};

	projectsApi.getData(params, callback, err);
};
const divisionsIds = ref();
const checkProjectCapabilities = () => {
	const checkIsSuperAdmin = roles?.value?.map(role => role?.role?.name).includes('superadmin');
	const checkIsAdmin = roles?.value?.map(role => role?.role?.name).includes('admin');
	const checkIsOnlyAdmin = !checkIsSuperAdmin && checkIsAdmin;
    const hasDivisions = user?.value?.divisions?.map(division => division?.devision_id) || [];
	if (checkIsOnlyAdmin && hasDivisions?.length === 0) {
        localStorage.removeItem('token');
		router.push('/login');
		toast?.error('Anda tidak memiliki divisi yang terdaftar, untuk lebih lanjut hubungi Admin');
	} else if (checkIsOnlyAdmin) {
        divisionsIds.value = hasDivisions;
    }
	getData();
};

const init = () => {
    const query = route.query;
    divisionId.value = query?.division_id;
};


const dataMounted = onMounted(() => {
    checkProjectCapabilities();
    init();
	store.setHeaders(headers);
});

onBeforeUnmount(() => {
    dataMounted();
});
</script>

<style></style>
