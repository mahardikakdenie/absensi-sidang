<template>
    <card className="hover:shadow-md cursor-pointer">
        <div class="flex justify-between">
            <div class="flex items-center">
                <span class="lg:text-2xl text-sm">
                    {{ title }}
                </span>
            </div>
            <div>
                <div>
                    <span class="text-sm"> Progress </span>
                </div>
                <div class="text-sm block mb-[2px] text-primary-500">100%</div>
            </div>
        </div>
    </card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from '@/components/Card/index.vue'

const props = defineProps({
    item: {
        type: Object,
        default: null,
    },
});

const title = computed(() => props.item?.name ?? 'Name');
</script>

<style>
</style>
