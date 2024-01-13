<template>
<div>
    <card>
        <data-table title="Attendance List" />
    </card>
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import { computed, onMounted } from 'vue';
import { getAllData } from "@/helpers/attendances";
import { useDataTableStore } from '@/store/data-table';

const store = useDataTableStore();


const fetchParams = computed(() => ({
    entities: 'project,user',
}));

const getDataAttendance = () => {
    const params = fetchParams?.value
    const callback = (res) => {
        const data = res?.data?.data;
        console.log('data => ', data);
    };
    const err = (e) => {
        console.log(e);
    }

    getAllData(params, callback, err);
};

onMounted(() => {
    getDataAttendance();
});
</script>

<style>

</style>
