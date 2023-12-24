<template>
    <div>
        <vue-button
            v-for="(action, index) in actions"
            :key="index"
            :icon="action.icon"
            :icon-tooltip="action.tooltipText"
            :btn-class="action.btnClass"
        />
    </div>
</template>

<script setup>
import VueButton from '@/components/Button';
import { useDataTableStore } from '@/store/data-table';
import { computed } from 'vue';
const store = useDataTableStore();
const actions = computed(() => store.actions);
</script>
