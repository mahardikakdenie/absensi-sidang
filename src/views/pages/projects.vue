<template>
	<div>
		<div class="grid grid-rows-1">
			<div
				v-if="projects.length > 0 && !isLoading"
				class="grid lg:grid-cols-5 grid-cols-2 gap-2"
            >
				<div
					v-for="(division, i) in projects"
					:key="i"
					@click="$router.push(`/detail-project/${i}`)">
					<box-list :item="division" />
				</div>
			</div>
            <div v-else-if="isLoading">
                <page-loader />
            </div>
			<div v-else class="flex justify-center">
				<div class="">
					<span>Tidak ada Data</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import projectApi from '@/helpers/projects';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import PageLoader from '@/components/Loader/pageLoader.vue'
import BoxList from '@/components/Card/box-list.vue';

const projects = ref([]);
const isLoading = ref(false);

const route = useRoute();

// Fetch data from API
const params = computed(() => ({
	division_id: route.params.division_id,
}));
const getData = () => {
    isLoading.value = true;
	const callback = (response) => {
        isLoading.value = false;
		projects.value = response.data.data;
	};

	const err = (e) => {
        isLoading.value = false;
		console.log('e => ', e);
	};

	projectApi.getData(params.value, callback, err);
};

onMounted(() => {
	getData();
});
</script>

<style></style>
