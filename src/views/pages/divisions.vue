<template>
<div>
    <div class="grid grid-rows-1">
        <div v-if="divisions.length > 0 && !isLoading" class="grid lg:grid-cols-5 grid-cols-2 gap-2">
            <div 
                v-for="(division, i) in divisions" 
                :key="i"
                @click="$router.push(`/divisions/${division.id}`)"
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
import { onMounted, ref, computed } from 'vue';
import pageLoader from '@/components/Loader/pageLoader.vue';

const user = computed(() => JSON.parse(localStorage.getItem('users')));
const roles = computed(() => user?.value?.roles);

const divisionsIds = ref();
const checkCapabilities = () => {
	const checkIsUserAdmin = roles?.value?.map(role => role?.role?.name).includes('user_admin');
	const checkIsUser = roles?.value?.map(role => role?.role?.name).includes('user');
	const checkIsUserAccebility = checkIsUserAdmin || checkIsUser;
    const hasDivisions = user?.value?.divisions?.map(division => division?.devision_id) || [];
	if (checkIsUserAccebility && hasDivisions?.length === 0) {
		localStorage.removeItem('token');
		router.push('/login');
		toast?.error('Anda tidak memiliki divisi yang terdaftar, untuk lebih lanjut hubungi Admin');
	} else if (checkIsUserAccebility) {
		divisionsIds.value = hasDivisions;
	}
	getData();
};

const divisions = ref([]);
const isLoading = ref(false);

const getData = () => {
    const params = {
        division_ids: divisionsIds?.value,
    }
    const callback = (response) => {
        divisions.value = response.data.data;
    };

    const err = (e) => {
        console.log('e => ', e);
    };

    divisionApi.getData(params, callback, err);
};

onMounted(() => {
    checkCapabilities();
});
</script>

<style>

</style>
