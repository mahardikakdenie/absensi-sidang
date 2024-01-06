<template>
	<div>
		<card>
			<data-table
				title="Project"
				btn-text="Buat Project"
				@open-modal-add="onOpenModalAdd" />
		</card>
		<ModalForm
			:active-modal="isModalAddVisible"
			title="Buat Project"
			:fields="form"
			@close="isModalAddVisible = false" />
	</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import { createFormField } from '@/constant/helpers';
import division from '@/helpers/division';
import projectsApi from '@/helpers/projects.js';
import { useDataTableStore } from '@/store/data-table.js';
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ModalForm from '@/components/Modal/Form.vue';

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

const formConfig = [
	{
		type: 'text',
		key: 'name',
		label: 'Nama',
		placeholder: 'Masukan Nama',
	},
    {
        type: 'text',
        key: 'projectNo',
        label: 'Project No',
        placeholder: 'Masukan Nomor Project',
    },
    {
        type: 'text',
        key: 'cost',
        label: 'Nilai Project',
        placeholder: 'Masukan Nilai Project',
    },
    {
        key: 'divisionids',
        type: 'multiselect',
        value: null,
        options: [],
        label: 'Divisi',
        placeholder: 'Masukan Divisi',
    },
	{
		key: 'userids',
		type: 'multiselect',
        options: [],
		label: 'Yang Ditugaskan',
		placeholder: 'Masukan Akun yang di tugaskan',
	},
    {
        key: 'startdate',
        type: 'date',
        label: 'Nasukan Tanggal Project Dimulai',
        placeholder: 'Nasukan Tanggal Project Dimulai',
    },
    {
        key: 'targetdate',
        type: 'date',
        label: 'Nasukan Tanggal Project Berakhir/selesai',
        placeholder: 'Nasukan Tanggal Project Berakhir/selesai',
    },
	{
		key: 'description',
		type: 'textarea',
		label: 'Description',
		placeholder: 'Masukan Description',
	},
	{
		key: 'address',
		type: 'textarea',
		label: 'Description',
		placeholder: 'Masukan address',
	},
];

const form = ref(formConfig.map(createFormField));

const actions = [];
const divisionId = ref(null);
const fetchParams = computed(() => {
	return {
		division_id: route?.query?.divison_id,
	};
});

const isModalAddVisible = ref(false);

const onOpenModalAdd = () => {
	isModalAddVisible.value = true;
};

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
	const checkIsSuperAdmin = roles?.value
		?.map((role) => role?.role?.name)
		.includes('superadmin');
	const checkIsAdmin = roles?.value
		?.map((role) => role?.role?.name)
		.includes('admin');
	const checkIsOnlyAdmin = !checkIsSuperAdmin && checkIsAdmin;
	const hasDivisions = user?.value?.divisions || [];
	if (checkIsOnlyAdmin && hasDivisions?.length === 0) {
		localStorage.removeItem('token');
		router.push('/login');
		toast?.error(
			'Anda tidak memiliki divisi yang terdaftar, untuk lebih lanjut hubungi Admin'
		);
	} else if (checkIsOnlyAdmin) {
		divisionsIds.value = hasDivisions?.map((division) => division?.devision_id);
        form.value[3].options = hasDivisions.map(curr => ({
        label: curr?.division?.name,
        id: curr?.division?.id,
    }))
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

	const address = 'Jalan Sulaksana no 08';

	// Construct the API request URL
	const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
		address
	)}`;

	// Make a GET request to the Nominatim API
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			// Check if the response has results
			if (data.length > 0) {
				const location = data[0];
				const latitude = parseFloat(location.lat);
				const longitude = parseFloat(location.lon);

				console.log('Latitude:', latitude);
				console.log('Longitude:', longitude);
			} else {
				console.error('Geocoding request failed: No results');
			}
		})
		.catch((error) => {
			console.error('Error fetching geocoding data:', error);
		});
});

onBeforeUnmount(() => {
	dataMounted();
});
</script>

<style></style>
