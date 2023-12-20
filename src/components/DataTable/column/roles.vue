<template>
<div class="">
    <ul class="flex flex-wrap gap-2">
        <li v-for="(role, index) in data.roles" :key="index" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <vue-badge :label="role" />
        </li>
    </ul>
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
