<template>
<div class="flex justify-center items-center p-2">
    <vue-badge :label="status" :badgeClass="getColorStatus" />
</div>

</template>

<script setup>
import VueBadge from '@/components/Badge/index.vue';
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: '',
    },
    data: {
        type: Object,
        default: {},
    },
});

const status = computed(() => props?.data?.status?.split('_').join(' '));
const getColorStatus = computed(() => {
    let color = 'bg-primary-600 text-primary-100';
    if (status.value === 'not active' || status.value === 'draft') {
        color = 'bg-danger-600 text-danger-100'
    }
    return color;
});
</script>

<style>

</style>
