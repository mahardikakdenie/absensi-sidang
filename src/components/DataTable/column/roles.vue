<template>
    <div class="flex flex-wrap">
    <div v-for="(role, index) in data.roles" :key="index" class="flex justify-start items-center p-2">
        <vue-badge :label="role" />
    </div>
</div>

</template>

<script setup>
import VueBadge from '@/components/Badge/index.vue';

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
</script>

<style>

</style>
