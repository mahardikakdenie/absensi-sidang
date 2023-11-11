<template>
<div>
    <div class="bg-white lg:w-[200px] border rounded-md flex p-2 justify-around">
        <information-color
            v-for="(information, index) in formatInformations"
            :key="index"
            :color-code="information.colorCode"
            :label="information.label"
        />
    </div>
    
    <div class="">
        <card>
            <div class="flex justify-between">
                <div>
                    <span class="">
                        CODE -ABC
                    </span>
                </div>
                <div>
                    <div>
                        <span class="font-bold text-[12px] lg:text-lg">
                            Rp 9.999.999.999
                        </span>
                    </div>
                    <div class="flex justify-end">
                        <span class="text-sm">
                            01-01-2023
                        </span>
                    </div>
                </div>
            </div>

            <single-accordion parentClass="mt-3" title="Project Name" />
        </card>
    </div>
</div>
</template>

<script setup>
import InformationColor from '@/components/attandance-pages/InformationColor.vue';
import Card from '@/components/Card';
import SingleAccordion from '@/components/Accordion/SingleAccordion.vue'
import {
    formatInformations
} from '@/constant/static';
</script>

<style>

</style>
