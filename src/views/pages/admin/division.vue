<template>
<div>
    <card>
        <data-table title="Divisi" btn-text="Buat Divisi" />
    </card>
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import divisionApi from '@/helpers/division.js';
import { useDataTableStore } from '@/store/data-table.js';
import { onMounted } from 'vue';

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

const actions = [];


const getData = () => {
    const callback = (response) => {
        const divisions = response?.data?.data;
        console.log("🚀 ~ file: division.vue:33 ~ callback ~ divisions:", divisions);
        store.setData(divisions);
    };

    const err = (e) => {
        console.log('e => ', e);
    };

    divisionApi.getData({}, callback, err);
};

onMounted(() => {
    getData();
    store.setHeaders(headers)
});
</script>

<style>

</style>
