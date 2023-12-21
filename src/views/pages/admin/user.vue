<template>
<div>
    <card>
        <data-table 
            title="Akun"
            @open-modal-add="toogleModalUser"
        />
    </card>
    <modal-form 
        :active-modal="isModalAddUser"
        :fields="form"
        @submit="submit"
        @close="isModalAddUser = false" 
    />
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import ModalForm from '@/components/Modal/Form.vue';
import userApi from '@/helpers/user.js';
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useDataTableStore } from '@/store/data-table.js';
import user from '@/helpers/user.js';

const userDummyImage = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';
const store = useDataTableStore();
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
    }
];

const users = ref([]);
const getDataUser = () => {
    const params = {
        entities: 'roles.role',
    };
    const callback = (response) => {
        if (response.data.meta.status) {
            const data = response.data.data;
            users.value = data.map(user => {
                return {
                    ...user,
                    image: userDummyImage,
                    roles: user?.roles?.map(role => role?.role?.name) ?? '-',
                    status: user?.status ?? '-',
                }
            });
            store.setData(users.value);
        }
    };

    const err = (e) => {
        console.log(e);
    }

    userApi.getAllUsers(params, callback, err);
};

const watcherData = watchEffect(() => {
    store.setHeaders(headers);
    getDataUser();
});

onBeforeUnmount(() => {
    watcherData();
});
// end Define Headers

const form = ref([
    {
        type: 'text',
        value: '',
        error: '',
        key: 'email',
        label: 'Email',
        placeholder: 'Masukan Email',
    },
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

const isModalAddUser = ref(false);
const toogleModalUser = () => {
    isModalAddUser.value = !isModalAddUser.value;
};

const submit = (form) => {
    form.value = form;
    // console.log("🚀 ~ file: user.vue:141 ~ submit ~ form.value:", form.value)
    // const callback = (res) => {
    //     if (res?.data?.meta?.status) {
    //         const user = res.data.data;
    //         console.log("🚀 ~ file: user.vue:145 ~ callback ~ user:", user)
    //         users.value.push(user);
    //         isModalAddUser.value = false;
    //     }
    // };

    // const err = (e) => {
    //     console.log(e);
    // };

    // userApi.createUser(form.value, callback, err);
};


</script>

<style>

</style>
