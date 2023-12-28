<template>
<div>
    <card title="Summary" class-name="mb-4">
        <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-3">
            <boxSummary :statistics="summaries" />
        </div>
    </card>
    <card>
        <data-table 
            title="Akun"
            btn-text="Buat Akun"
            @open-modal-add="toogleModalUser"
        />
    </card>
    <modal-form 
        :active-modal="isModalAddUser"
        :fields="form"
        btn-text="Buat Akun"
        @submit="submit"
        @close="close" 
    />
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import ModalForm from '@/components/Modal/Form.vue';
import userApi from '@/helpers/user.js';
import { getRoles } from '@/helpers/roles.js';
import { onBeforeUnmount, onMounted, ref, watchEffect,watch } from 'vue';
import { useDataTableStore } from '@/store/data-table.js';
import boxSummary from '@/components/Card/box-summary.vue';
import user from '@/helpers/user.js';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const userDummyImage = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';
const store = useDataTableStore();
const router = useRouter()
const route = useRoute()
const toast = useToast();
// Define Headers
const headers = [
    {
        label: 'Name',
        field: 'name', 
    },
    {
        label: 'Roles',
        field: 'roles'
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
        field: 'status'
    },
    {
        label: 'Actions',
        field: 'actions',
    }
];

const summaries = ref([
    {
        key: 'all',
		title: 'Total Akun',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
    {
        key: 'active',
		title: 'Akun Aktif',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
    {
        key: 'not_active',
		title: 'Akun Tidak Active',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
    {
        key: 'superadmin',
		title: 'Superadmin',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
    {
        key: 'admin',
		title: 'Admin',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
    {
        key: 'user',
		title: 'User',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
    {
        key: 'supervisor',
		title: 'Supervisor',
		count: '0',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
]);

const setNameConfig = ref({
    icons: [
        {
            icon: 'mdi:email-send',
            tooltipText: 'Kirim email untuk mengaktivasi akun ini',
            btnClass: 'btn-sm btn hover:text-success-600 p-0',
        },
        {
            icon: 'octicon:log-16',
            tooltipText: 'Lihat catatan Kehadiran',
            btnClass: 'btn-sm btn hover:text-success-600 p-0',
        }
    ],
});

const form = ref([
    {
        type: 'text',
        value: '',
        error: '',
        key: 'name',
        label: 'Nama',
        placeholder: 'Masukan Nama'
    },
    {
        type: 'text',
        value: '',
        error: '',
        key: 'username',
        label: 'Username',
        placeholder: 'Masukan Username'
    },
    {
        key: 'roleids',
        type: 'multiselect',
        value: null,
        error: 'asdasd',
        options: [],
        label: 'Role',
        placeholder: 'Masukan Role',
    },
    {
        type: 'email',
        value: '',
        error: '',
        key: 'email',
        label: 'Email',
        placeholder: 'Masukan Email',
    },
    {
        type: 'password',
        value: '',
        error: '',
        key: 'password',
        label: 'password',
        placeholder: 'Masukan password'
    },
    {
        type: 'password',
        value: '',
        error: '',
        key: 'confirm_password',
        label: 'Konfirmasi',
        placeholder: 'Masukan Konfirmasi password'
    },
]);


const users = ref([]);
const currentPage = ref(1);
const perPage = ref(10);
const getDataUser = () => {
    const params = {
        entities: 'roles.role,profile.medias',
        paginate: perPage.value,
        page: currentPage?.value,
        summary: route?.query?.summary
    };
    const callback = (response) => {
        if (response.data.meta.status) {
            const data = response.data.data;
            users.value = data.map(user => {
                return {
                    ...user,
                    image: user?.profile?.medias?.url ?? userDummyImage,
                    roles: user?.roles?.map(role => role?.role?.name) ?? '-',
                    status: user?.status ?? '-',
                }
            });
            store.setMeta(response.data.meta);
            store.setData(users.value);
        }
    };

    const err = (e) => {
        console.log(e);
    }

    userApi.getAllUsers(params, callback, err);
};

const getUserSummary = () => {
    const params = {};
    const callback = (res) => {
        const data = res.data.data;
        summaries.value[0].count = data?.all;
        summaries.value[1].count = data?.active;
        summaries.value[2].count = data?.not_active;
        summaries.value[3].count = data?.superadmin;
        summaries.value[4].count = data?.admin;
        summaries.value[5].count = data?.user;
        summaries.value[6].count = data?.supervisor;
    }
    const err = () => {};
    userApi.getUserSummary(params, callback, err);
};

const getRolesData = () => {
    const callback = (res) => {
        const data = res?.data?.data;
        form.value[2].options = data.map(curr => {
            return {
                id: curr?.id,
                label: curr?.name
            }
        });

        console.log(form?.value[5].options);
    };
    const err = (e) => {
        console.log(e);
    }
    getRoles({type: 'selected'}, callback, err);
}

const watcherData = watchEffect(() => {
    getDataUser();
});

watch(() => store?.meta?.current_page, (value) => {
    currentPage.value = value;
});

watch(() => store?.meta?.per_page, (value) => {
    perPage.value = value;
})

onMounted(() => {
    store.setHeaders(headers);
    store.setNameConfig(setNameConfig?.value);
    getRolesData();
    getUserSummary();
}),

onBeforeUnmount(() => {
    watcherData();
});
const isModalAddUser = ref(false);
const toogleModalUser = () => {
    isModalAddUser.value = !isModalAddUser.value;
    store.setDisableSearch(true);
};

const close = () => {
    isModalAddUser.value = false;
    store.setDisableSearch(false);
};

const submit = (form, type) => {
    form.value = form;
    const value = form?.value.map(curr => curr.value);
   
    if (type === 'create') {
        createUser(value);
    } else if(type === 'update') {
        updateUser(value);
    }
};

const createUser = (value) => {
    const params = {
        name: value[0],
        username: value[1],
        role_ids: value?.[2].map(curr => curr.id),
        email: value[3],
        password: value[4],
    };
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data;
            const user = {
                ...data,
                image: userDummyImage,
                roles: value?.[2]?.map(role => role?.label) ?? '-',
                username: data?.username ?? value?.[1],
            }
            store.insertData(user);
            toast.success('User berhasil di tambahkan lakukan aktivasi agar bisa di gunakan', {
                timeout: 2000,
            });
            isModalAddUser.value = false;
        }
    };

    const err = (e) => {
        console.log(e);
    };

    userApi.createUser(params, callback, err);
};

const updateUser = (value) => {};


</script>

<style>

</style>
