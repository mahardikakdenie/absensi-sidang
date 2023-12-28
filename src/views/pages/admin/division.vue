<template>
<div>
    <card>
        <data-table title="Divisi" btn-text="Buat Divisi" @open-modal-add="toogleModalForm" />
    </card>
    <modal-form 
        :active-modal="isModalForm"
        :fields="form"
        btn-text="Buat Divisi"
        @submit="submit"
        @close="toogleModalForm" 
    />
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import divisionApi from '@/helpers/division.js';
import { useDataTableStore } from '@/store/data-table.js';
import { onMounted, ref } from 'vue';
import ModalForm from '@/components/Modal/Form.vue';
import userApi from '@/helpers/user.js'

const store = useDataTableStore();

const headers = [
    {
        label: 'Name',
        field: 'name', 
    },
    {
        label: 'Status',
        field: 'status'
    },
    {
        label: 'Actions',
        field: 'actions'
    }
];

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
        key: 'userids',
        type: 'multiselect',
        value: null,
        error: '',
        options: [],
        label: 'Yang Ditugaskan',
        placeholder: 'Masukan Akun yang di tugaskan',
    },
    {
        type: 'textarea',
        value: '',
        error: '',
        key: 'description',
        label: 'Description',
        placeholder: 'Masukan Description'
    },
]);

const actions = [];


const getData = () => {
    const callback = (response) => {
        const divisions = response?.data?.data;
        store.setData(divisions);
    };

    const err = (e) => {
        console.log('e => ', e);
    };

    divisionApi.getData({}, callback, err);
};

const getDataUser = () => {
    const params = {
        paginate: 10,
        entities: 'profile.medias, roles',
        summary: 'user',
    };
    const callback = (response) => {
    const userDummyImage = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';
        if (response.data.meta.status) {
            const data = response.data.data;
            form.value[1].options = data.map(user => {
                return {
                    id: user?.id,
                    label: user?.name,
                    image: user?.profile?.medias?.url ?? userDummyImage,
                }
            });
        }
    };

    const err = (e) => {
        console.log(e);
    }

    userApi.getAllUsers(params, callback, err);
};

const submit = (value) => {
    console.log('value => ', value);
    const params = {};
    divisionApi.createDivision();
};
const close = () => {};

const isModalForm = ref(false);
const toogleModalForm = () => {
    isModalForm.value = !isModalForm.value;
};

onMounted(() => {
    getData();
    getDataUser();
    store.setHeaders(headers)
    store.setNameConfig(null)
});
</script>

<style>

</style>
