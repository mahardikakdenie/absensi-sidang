<template>
<span class="flex">
    <span
        class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
        <img
            v-if="data && data.image "
            :src="data.image"
            :alt="data.image"
            class="object-cover w-full h-full rounded-full" 
        />
    </span>
    <span class="text-sm text-slate-600 dark:text-slate-300 capitalize">
        {{ data.name }}
    </span>
</span>
</template>

<script setup>
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
