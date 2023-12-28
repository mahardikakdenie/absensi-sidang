<template>
<div class="flex items-center name-column"> <!-- Menambahkan class items-center untuk menengahkan vertikalnya -->
    <span
        class="w-10 h-10 rounded-full ltr:mr-4 rtl:ml-4 flex-none"> <!-- Mengubah w-7 dan h-7 menjadi w-10 dan h-10 -->
        <img
            v-if="data && data.image"
            :src="data.image"
            :alt="data.image"
            class="object-cover w-full h-full rounded-full" 
        />
    </span>
    <div class="text-start">
        <span class="text-sm text-slate-600 dark:text-slate-300 capitalize text-start"> <!-- Mengubah text-md menjadi text-lg -->
            {{ data.name }}
        </span>
        <div v-if="config?.icons.length > 0" class="grid grid-cols-4 mt-2 button-icon">
            <vue-button 
                v-for="(icon, index) in config?.icons" 
                :key="index" 
                :icon="icon.icon" 
                :btn-class="icon.btnClass" 
                :icon-tooltip="icon.tooltipText"
            />
        </div>
    </div>
</div>

</template>

<script setup>
import Icon from '@/components/Icon';
import VueButton from '@/components/Button';
import { useDataTableStore } from "@/store/data-table.js";
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
const store = useDataTableStore();
const config = computed(() => store?.nameConfig);
</script>

<style lang="scss">
.name-column {
    .button-icon {
        opacity: 0;
    }

    &:hover {
        .button-icon {
            opacity: 1;
        }
    }
}
</style>
