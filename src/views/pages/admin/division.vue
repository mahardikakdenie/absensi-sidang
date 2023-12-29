<template>
	<div>
		<card>
			<data-table
				title="Divisi"
				btn-text="Buat Divisi"
				@open-modal-add="toogleModalForm('add')" />
		</card>
		<modal-form
			:active-modal="isModalForm"
			:fields="form"
			:type="typeForm"
			btn-text="Buat Divisi"
			@submit="submit"
			@close="close" />
	</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import divisionApi from '@/helpers/division.js';
import { useDataTableStore } from '@/store/data-table.js';
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import ModalForm from '@/components/Modal/Form.vue';
import userApi from '@/helpers/user.js';
import { duplicateVar } from '@/constant/helpers';

const userDummyImage =
	'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';

const store = useDataTableStore();

const typeForm = ref('');

const headers = [
	{ label: 'Name', field: 'name' },
	{ label: 'Status', field: 'status' },
	{ label: 'Ditugaskan', field: 'assign' },
	{ label: 'Actions', field: 'actions' },
];

const createFormField = (config) => ({
	type: config.type,
	value: '',
	error: '',
	...config,
});

const formConfig = [
	{
		type: 'text',
		key: 'name',
		label: 'Nama',
		placeholder: 'Masukan Nama',
	},
	{
		key: 'userids',
		type: 'multiselect',
		label: 'Yang Ditugaskan',
		placeholder: 'Masukan Akun yang di tugaskan',
	},
	{
		key: 'description',
		type: 'textarea',
		label: 'Description',
		placeholder: 'Masukan Description',
	},
];

const form = ref(formConfig.map(createFormField));
const divisionId = ref(null);

const setFormUpdate = (formValues, type) => {
	const userFieldConfig = formConfig.find((field) => field.key === 'userids');

	if (type === 'update') {
		form.value[1] = null;
	} else {
		form.value[1] = createFormField(userFieldConfig);
		form.value[1].value = formValues?.users;
	}

	form.value[0].value = formValues?.name;
	form.value[2].value = formValues?.description;
	divisionId.value = formValues?.id;
};

const actions = [
	{
		key: 'update',
		icon: 'bi:pencil',
		tooltipText: 'Edit Divisi',
		btnClass: 'btn btn-sm text-primary-400',
	},
	{
		key: 'unpublish',
		icon: 'fluent-mdl2:unpublish-content',
		tooltipText: 'Ubah Status menjadi draft/unpublish',
		btnClass: 'btn btn-sm text-danger-400',
	},
	{
		key: 'publish',
		icon: 'fluent-mdl2:publish-content',
		tooltipText: 'Ubah Status menjadi publish',
		btnClass: 'btn btn-sm text-success-600',
	},
];

const perPage = ref(10);
const currentPage = ref(1);

watch(
	() => store?.meta?.current_page,
	(value) => {
		currentPage.value = value;
	}
);
watch(
	() => store?.meta?.per_page,
	(value) => {
		perPage.value = value;
	}
);

watch(
	() => store?.typeAction,
	(value) => {
		if (value !== null) {
			if (value.key === 'update') {
				value.data.users = null;
				setFormUpdate(value?.data, 'update');
				toogleModalForm('update');
			} else if (value.key === 'add') {
				setFormUpdate(value?.data);
			}
		}
	}
);

const getData = () => {
	const params = {
		paginate: perPage.value,
		page: currentPage?.value,
		entities: 'users.user.profile.medias',
	};

	const callback = (response) => {
		const divisions = response?.data?.data;
		const divisionMap = divisions.map((division) => ({
			...division,
			assignto: division?.users
				?.filter((user) => user.type !== 'owner')
				.map((user) => ({
					id: user?.user?.id,
					url: user?.user?.profile?.medias?.url ?? userDummyImage,
					name: user?.user?.name,
				})),
		}));
		store.setData(divisionMap);
		const meta = response?.data?.meta;
		store.setMeta(meta);
	};

	const err = (e) => {
		console.log('e => ', e);
	};

	divisionApi.getData(params, callback, err);
};

const submit = (value, type) => {
	if (type === 'add') {
		createDivision(value);
	} else {
		updateDivision(value);
	}
};

const createDivision = (value) => {
	const params = {
		name: value?.[0]?.value,
		usersIdsAssignTo: value?.[1]?.value.map((curr) => curr.id),
		description: value?.[2]?.value,
	};
	const callback = (res) => {
		const data = res?.data?.data;
		store.insertData(data);
		close();
	};

	const err = (e) => {
		console.log(e);
	};
	divisionApi.createDivision(params, callback, err);
};

const updateDivision = (value) => {
	const params = {
		name: value[0].value,
		description: value[2].value,
	};
	const callback = (res) => {
		if (res?.data?.meta?.status) {
			store.updateData(value, divisionId.value);
			close();
		}
	};
	const err = (e) => {};
	divisionApi.updateDivision(divisionId?.value, params, callback, err);
};

const close = () => {
	isModalForm.value = false;
};

const isModalForm = ref(false);
const toogleModalForm = (type) => {
	typeForm.value = type;
	isModalForm.value = !isModalForm.value;
	if (type === 'add') {
		store.trigerAction({ key: type, data: form.value });
	}
};

const getDataUser = () => {
	const params = {
		paginate: 10,
		entities: 'profile.medias, roles',
		summary: 'user',
	};

	const callback = (response) => {
		if (response.data.meta.status) {
			const data = response.data.data;
			form.value[1].options = data.map((user) => ({
				id: user?.id,
				label: user?.name,
				image: user?.profile?.medias?.url ?? userDummyImage,
			}));
		}
	};

	const err = (e) => {
		console.log(e);
	};

	userApi.getAllUsers(params, callback, err);
};

const watcherData = watchEffect(() => {
	getData();
});

onBeforeUnmount(() => {
	watcherData();
});

const init = () => {
	store?.setActions(actions);
};

onMounted(() => {
	getDataUser();
	store.setHeaders(headers);
	store.setNameConfig(null);
	init();
});
</script>

<style></style>
