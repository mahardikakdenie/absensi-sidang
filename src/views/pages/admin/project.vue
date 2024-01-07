<template>
	<div>
		<card>
			<data-table
				title="Project"
				btn-text="Buat Project"
				@open-modal-add="onOpenModalAdd" />
		</card>
		<ModalForm
			:active-modal="isModalFormVisible"
			title="Buat Project"
			:fields="form"
            :type="typeForm"
			@close="isModalFormVisible = false"
            @submit="onSubmit"
        />
        <ModalConfirm 
            :active-modal="isModalConfirm"
            title="Publish Content"
            :text="textModal"
            @close="isModalConfirm = false"
            @submit="onSubmitStatus"
        />
	</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import { createFormField, createOptionSelect } from '@/constant/helpers';
import division from '@/helpers/division';
import projectsApi from '@/helpers/projects.js';
import { useDataTableStore } from '@/store/data-table.js';
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ModalForm from '@/components/Modal/Form.vue';
import userApi from '@/helpers/user';
import divisionApi from '@/helpers/division';
import { useToast } from 'vue-toastification';
import ModalConfirm from '@/components/Modal/Confirm.vue';
const userDummyImage =
	'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';

const textModal = ref();
const store = useDataTableStore();
const route = useRoute();
const toast = useToast();

const user = computed(() => JSON.parse(localStorage.getItem('users')));
const roles = computed(() => user?.value?.roles);
const projectId = ref();

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
		label: 'Cost',
		field: 'cost',
	},
	{ label: 'Mulai', field: 'startdate' },
	{ label: 'Selesai', field: 'targetdate' },
    {
        label: 'Status',
        field: 'status'
    },
{ label: 'Anggota', field: 'assign' },
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
        multiple: false,
        label: 'Divisi',
        placeholder: 'Masukan Divisi',
    },
	{
        key: 'userids',
		type: 'multiselect',
        multiple: true,
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
		type: 'multiselect',
        options: [],
        error: '',
		label: 'Masukan Alamat Lengkap',
		placeholder: 'Masukan Address',
	},
];

const actions = [
	{
		key: 'update',
		icon: 'bi:pencil',
		tooltipText: 'Edit Divisi',
		btnClass: 'btn btn-sm text-primary-400',
	},
	{
		key: 'draft',
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

const form = ref(formConfig.map(createFormField));

watch(
	() => store?.typeAction,
	(value) => {
        handleTypeAction(value);
	}
);

const handleTypeAction = (value) => {
    console.log("🚀 ~ file: project.vue:172 ~ handleTypeAction ~ value:", value)
    if (value.key === 'update') {
        isModalFormVisible.value = true;
        typeForm.value = value.key;
        projectId.value = value?.data?.id;
        setFormData(value);
    } else if (value?.key !== 'add') {
        toggleModalConfirm();
        textModal.value = `Apakah anda yakin ingin mengubah status menjadi ${value?.key} di project ${value.data.name}`;
    }
};

const isModalConfirm = ref(false);
const toggleModalConfirm = (type) => {
	isModalConfirm.value = true;
}

const setFormData = (value) => {
    form.value[0].value = value?.data?.name;
    form.value[1].value = value?.data?.projectNo;
    form.value[2].value = value?.data?.cost?.toString();
    form.value[3].value = createOptionSelect(value?.data?.division?.id, value?.data?.division?.name, null);
    form.value[4].value = value?.data?.users?.map(curr => createOptionSelect(curr?.id, curr?.user?.name, null));
    form.value[5].value = value?.data?.startdate;
    form.value[6].value = value?.data?.targetdate;
    form.value[7].value = value?.data?.description;
    form.value[8].value = value?.data?.address;
};

const divisionId = ref(null);
const fetchParams = computed(() => {
	return {
		division_id: route?.query?.divison_id,
	};
});

const isModalFormVisible = ref(false);
const typeForm = ref('add');
const onOpenModalAdd = () => {
	isModalFormVisible.value = true;
    typeForm.value = 'add';
    form?.value?.forEach(element => {
        element.value = null;
    });
};

const getData = () => {
	const params = {
		division_id: divisionId?.value ?? null,
		division_ids: divisionsIds?.value ?? null,
        entities: 'users.user.profile.medias, division',
	};
	const callback = (response) => {
		const projects = response?.data?.data;
        const projectMap = projects.map(project => ({
            ...project,
            assignto: project?.users
			?.filter((user) => user.type !== 'owner')
			.map((user) => ({
				id: user?.user?.id,
				url: user?.user?.profile?.medias?.url ?? userDummyImage,
				name: user?.user?.name,
			})),
        }))
		store.setData(projectMap);
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
	}
	getData();
    getUserSelected();
    getSelectedDivisions();
};

const getUserSelected = () => {
    const params = {
        division_ids: divisionsIds?.value,
        entities: 'profile.medias,roles.role',
    };
    const callback = (response) => {
        const data = response?.data?.data;
        form.value[4].options = data.map(curr => createOptionSelect(curr.id, curr.name, curr?.profile?.medias?.url ?? userDummyImage));
    };
    const err = (e) => {
        console.error(e);
    };

    userApi.getUserSelected(params, callback, err);
};

const getSelectedDivisions = () => {
    const params = {
        typeGet: 'selected',
        division_ids: divisionsIds?.value,
    };
    
    const callback = (res) => {
        const divisions = res?.data?.data;
        form.value[3].options = divisions.map(curr => ({
            label: curr?.name,
            id: curr?.id,
        }))
    }

    const err = (e) => {
        console.error(e);
    }

    divisionApi.getData(params, callback, err);
};

const init = () => {
	const query = route.query;
	divisionId.value = query?.division_id;
};

const dataMounted = onMounted(() => {
	checkProjectCapabilities();
	init();
	store.setHeaders(headers);
    store?.setActions(actions);
});


const dataLong = ref(null);
const dataLat = ref(null);

const onInputSelectAddress = (address) => {
    generateLatAndLong(address);
};

const onSubmit = (data, type) => {
    const params = {
        name: data?.[0]?.value,
        projectNo: data?.[1]?.value,
        cost: data?.[2]?.value,
        devisionId: data?.[3].value?.id,
        user_ids: data?.[4].value?.map(curr => curr?.id),
        startdate: data?.[5].value,
        targetdate: data?.[6].value,
        description: data?.[7].value,
        address: data?.[8].value?.label,
        longitude: data?.[8]?.value?.longitude,
        latitude: data?.[8]?.value?.latitude,
    };
    console.log("🚀 ~ file: project.vue:250 ~ onSubmit ~ params:", params)

    if (type === 'add') {
        createProject(params);
    } else if (type === 'update') {
        updateProject(data, params);
    }
};

const onSubmitStatus = (value, type) => {
    projectId.value = value?.id;
    const params = {
        status: type,
    }

    updateProject(params, params, 'confirm');
};

const createProject = (params) => {
    const callback = (response) => {
        if (response?.data?.meta.status) {
            const data = response?.data?.data;
            store?.insertData(data);
            toast?.success('Berhasil Membuat Project');
            isModalFormVisible.value = false;
        }
    }
    const err = (e) => {
        console.log(e);
    };
    projectsApi.createProject(params, callback, err);
};

const updateProject = (formValue, params, type = 'form') => {
    const callback = (response) => {
        if (response?.data?.meta?.status) {
            isModalFormVisible.value = false;
            isModalConfirm.value = false;
            toast.success('Data Berhasil Di Update');
            store?.updateData(formValue, projectId?.value, type);
        }
    };
    const err = (e) => {
        console.log(e);
    }

    projectsApi.updateProject(projectId?.value, params, callback, err);
};

onBeforeUnmount(() => {
	dataMounted();
});
</script>

<style></style>
