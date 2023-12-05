<template>
<div>
    <div class="grid grid-rows-1">
        <div class="grid lg:grid-cols-5 grid-cols-2 gap-2">
            <div 
                v-for="(division, i) in divisions" 
                :key="i"
                @click="$router.push(`/division/${division.id}`)"
            >
                <box-list :item="division" />
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import BoxList from '@/components/Card/box-list.vue';
import divisionApi from '@/helpers/division.js';
import { onMounted, ref } from 'vue';

const divisions = ref([]);

const getData = () => {
    const callback = (response) => {
        divisions.value = response.data.data;
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
