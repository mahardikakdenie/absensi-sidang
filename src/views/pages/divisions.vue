<template>
<div>
    <div class="grid grid-rows-1">
        <div v-if="divisions.length > 0 && !isLoading" class="grid lg:grid-cols-5 grid-cols-2 gap-2">
            <div 
                v-for="(division, i) in divisions" 
                :key="i"
                @click="$router.push(`/projects/${division.id}`)"
            >
                <box-list :element="division" />
            </div>
        </div>
        
        <page-loader v-else />
    </div>
</div>
</template>

<script setup>
import BoxList from '@/components/Card/box-list.vue';
import divisionApi from '@/helpers/division.js';
import { onMounted, ref } from 'vue';
import pageLoader from '@/components/Loader/pageLoader.vue';

const divisions = ref([]);
const isLoading = ref(false);

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
