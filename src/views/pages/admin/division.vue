<template>
<div>
    <card>
        <data-table title="Divisi" />
    </card>
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import divisionApi from '@/helpers/division.js';
import { onMounted } from 'vue';

const getData = () => {
    const callback = (response) => {
        console.log('responses => ', response);
    };

    const err = (e) => {
        console.log('e => ', e);
    };

    divisionApi.getData({}, callback, err);
};

onMounted(() => {
    getData();
});
</script>

<style>

</style>
