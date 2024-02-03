<template>
	<div>
		<data-table :title="titlePage" btn-text="Tambah Anggota" @open-modal-add="isModalUserVisible = true" />

        <ModalAddUser 
            :active-modal="isModalUserVisible" 
            :users="userOptions"
            @close="isModalUserVisible = false"
            @submit="submit"
        />

        <Confirm 
            :active-modal="isModalConfirmVisible" 
            :text="textConfirm"
            @close="isModalConfirmVisible = false"
            @submit="confirmDelete"
        />
	</div>
</template>

<script setup>
import DataTable from '@/components/DataTable/index.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';
import userApi from '@/helpers/user';
import { useDataTableStore } from '@/store/data-table';
import { userDummyImage } from '@/constant/static';
import { useProjectStore } from '@/store/project';
import { useToast } from 'vue-toastification';
import ModalAddUser from '@/components/Modal/add-user';
import projectApi from '@/helpers/projects';
import Confirm from '@/components/Modal/Confirm'

const titlePage = ref('');
const router = useRouter();
const route = useRoute();
const toast = useToast();
const isModalUserVisible = ref(false);


const store = useDataTableStore();
const storeProject = useProjectStore();

const initPage = () => {
    const routes = ['project', 'division', 'shift'];
    const validRoute = routes.forEach(curr => route?.params?.type.includes(curr));
	if (validRoute && storeProject.selectedProject) {
		titlePage.value = ` Anggota ${route?.params?.type} ${storeProject.selectedProject?.name}`;
	} else if (!storeProject?.selectedProject) {
		router?.push('/admin/project');
	}
};

const projectId = computed(() => route?.params?.id);
const textConfirm = ref('');
const isModalConfirmVisible = ref(false);

const headers = [
	{
		label: 'Name',
		field: 'name',
	},
	{
		label: 'Roles',
		field: 'roles',
	},
	{
		label: 'Username',
		field: 'userName',
	},
	{
		label: 'Email',
		field: 'email',
	},
	{
		label: 'Status',
		field: 'status',
	},
	{
		label: 'Actions',
		field: 'actions',
	},
];

const actions = [
    {
        key: 'delete',
        icon: 'material-symbols:delete',
        tooltipText: 'Hapus Anggota',
        btnClass: 'btn btn-sm text-red-400',
    },
    {
        key: 'add-shift',
        icon: 'fluent:shifts-add-24-regular',
        tooltipText: 'Tugaskan Shift',
        btnClass: 'btn btn-sm text-success-400',
    },
];

watch(() => store?.typeAction, (value) => {
    if (value.key === 'delete') {
        isModalConfirmVisible.value = true;
        textConfirm.value = `Apakah Anda yakin ingin menghapus Anggota ${value?.data?.name}`
    }
})

const getUsers = () => {
	const params = {
		project_ids: [projectId.value],
        entities: 'profile.medias, roles.role, projects'
		// not_have_this_projects:
	};

	const callback = (res) => {
		console.log(res);
		const users = res?.data?.data.map((user) => {
			return {
				...user,
				image: user?.profile?.medias?.url ?? userDummyImage,
				roles: user?.roles?.map((role) => role?.role?.name) ?? '-',
				status: user?.status ?? '-',
			};
		});
		store?.setData(users);
	};

	const err = (e) => {
		console.log(e);
	};

	userApi.getAllUsers(params, callback, err);
};

const userOptions = ref();

const getUserSelected = () => {
	const params = {
		// project_ids: ,
        entities: 'profile.medias, roles.role',
		not_have_this_projects:[projectId.value],
        roleIds: [2,4]
	};

	const callback = (response) => {
		if (response?.data?.meta?.status) {
			const data = response?.data?.data;
			userOptions.value = data.map(curr => ({
                ...curr,
                label: curr?.name,
                id: curr?.id,
            }));
		}
	};
	const err = (e) => {
		console.error(e);
	};

	userApi.getUserSelected(params, callback, err);
};

const submit = (users) => {
    insertUserProject(users);
}

const insertUserProject = (users) => {
	const params = {
		user_ids: users.map(curr => curr?.id),
		project_id: projectId?.value,
		// division_id: props?.divisionId,
	};
    us
	const callback = (response) => {
		if (response?.data?.meta?.status) {
            toast?.success('Berhasil Tambah Data');
            isModalUserVisible.value = false;
            getUsers();
            getUserSelected();
		}
	}
	const err = (e) => {
		console.log(e);
	};
    projectApi.insertUsersProject(params, callback, err);
};

const confirmDelete = (data) => {
    console.log("🚀 ~ confirmDelete ~ data:", data);
    console.log("🚀 ~ confirmDelete ~ data?.projects:", data?.projects)
    const index = data?.projects.findIndex(curr => curr?.project_id === parseInt(projectId.value));
    console.log("🚀 ~ confirmDelete ~ index:", index);
    const relationId = data?.projects?.[index]?.id;
    const callback = (res) => {
        if (res?.data?.data) {
            isModalConfirmVisible.value = false;
            toast?.success('Berhasil mengahapus keanggotaan');
            getUserSelected();
            getUsers();
        }
    };

    const err = (e) => {
        console.log(e);
    };

    projectApi.deleteUserProject(relationId, callback, err);
}


const init = () => {
	initPage();
	getUsers();
    getUserSelected();
	store?.setHeaders(headers);
    store?.setActions(actions);
};

onMounted(() => {
	init();
});
</script>
