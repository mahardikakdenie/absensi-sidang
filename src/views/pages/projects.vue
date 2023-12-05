<template>
<div>
    <div class="grid grid-rows-1">
        <div v-if="projects.length > 0" class="grid lg:grid-cols-5 grid-cols-2 gap-2">
            <div 
                v-for="(division, i) in projects" 
                :key="i"
                @click="$router.push(`/detail-project/${i}`)"
            >
                <box-list :item="division" />
            </div>
        </div>
        <div class="flex justify-center">
            <div class="">
                <span>Tidak ada Data</span>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import BoxList from '@/components/Card/box-list.vue';
import projectApi from '@/helpers/projects'
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const projects = ref([]);

const route = useRoute();

const params = computed(() => ({
    division_id: route.params.division_id,
}));

const getData = () => {
    const callback = (response)=> {
        projects.value = response.data.data;
    };

    const err = (e) => {
        console.log('e => ', e);
    };

    projectApi.getData(params.value, callback, err);
};

onMounted(() => {
    getData();
});
</script>

<style>

</style>
