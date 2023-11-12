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

            <single-accordion 
                title="Project Name"
                parentClass="mt-3"
                isOpen
            >
                <template #content>
                    <div class="mb-3">
                        <span class="font-bold text-lg">
                            Progress
                        </span>
                    </div>
                    <div>
                        <span>Progress</span>
                        <ProgressBar height="h-3" parentClass="mt-2">
                            <Bar 
                                :value="80" 
                                barColor="bg-[#CE7722]" 
                                showValue 
                            />
                            <Bar 
                                :value="10" 
                                barColor="bg-[#FFE5B4]" 
                                showValue
                                colorTextClass="text-black"
                            />
                        </ProgressBar>
                    </div>
                    <div class="mt-3">
                        <span>Deviasi</span>
                        <ProgressBar height="h-3" parentClass="mt-2">
                            <Bar 
                                :value="40" 
                                barColor="bg-[#CE7722]" 
                                showValue
                            />
                            <Bar 
                                :value="40" 
                                barColor="bg-[#FFE5B4]" 
                                showValue
                                colorTextClass="text-black"
                            />
                        </ProgressBar>
                    </div>
                </template>
            </single-accordion>
            <single-accordion title="Keterangan" isOpen parentClass="mt-2">
                <template #content>
                    <div>
                        <div>
                            <span>
                                Pengawas : Budi Raharja
                            </span>
                        </div>
                        <div>
                            <span>
                                Sisa Hari : 61 Hari
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <span class="text-sm font-bold">
                                    Task
                                </span>
                            </div>
                            <div class="">
                                <vue-button 
                                    text="Edit Task" 
                                    btnClass="py-2 px-2" 
                                    icon="typcn:edit" 
                                />
                            </div>
                        </div>
                        <div class="flex flex-wrap space-x-rb mt-4">
                            <Checkbox
                                v-for="(option, index) in options"
                                :key="index"
                                :label="option.label"
                                :value="option.value"
                                v-model="selected"
                                activeClass="ring-primary-500 bg-primary-500"
                                class="ml-2"
                            />
                        </div>
                    </div>
                </template>
            </single-accordion>
        </card>
    </div>
</div>
</template>

<script setup>
import InformationColor from '@/components/attandance-pages/InformationColor.vue';
import Card from '@/components/Card';
import SingleAccordion from '@/components/Accordion/SingleAccordion.vue';
import ProgressBar from '@/components/ProgressBar';
import Bar from '@/components/ProgressBar/Bar';
import VueButton from '@/components/Button/index.vue';
import Checkbox from '@/components/Checkbox/index.vue'
import {
    formatInformations
} from '@/constant/static';
import { computed, ref } from 'vue';
import { useThemeSettingsStore } from '@/store/themeSettings';

const store = useThemeSettingsStore();

const options = [
    {
        value: "Orange",
        label: "Orange",
    },
    {
        value: "Apple",
        label: "Apple",
    },
    {
        value: "Banana",
        label: "Banana",
    },
];

const selected = ref([]);

const columnCharthomeComputed = computed(() => {
    return {
    series: [
        {
        name: "Progress",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
        name: "Deviasi",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
    ],
    chartOptions: {
        chart: {
        toolbar: {
            show: false,
        },
        },
        plotOptions: {
        bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "45%",
        },
        },
        legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: "12px",
        fontFamily: "Inter",
        offsetY: -30,
        markers: {
            width: 8,
            height: 8,
            offsetY: -1,
            offsetX: -5,
            radius: 12,
        },
        labels: {
            colors: store.isDark ? "#CBD5E1" : "#475569",
        },
        itemMargin: {
            horizontal: 18,
            vertical: 0,
        },
        },
        title: {
        text: "Revenue Report",
        align: "left",

        offsetX: store.direction ? "0%" : 0,
        offsetY: 13,
        floating: false,
        style: {
            fontSize: "20px",
            fontWeight: "500",
            fontFamily: "Inter",
            color: store.isDark ? "#fff" : "#0f172a",
        },
        },
        dataLabels: {
        enabled: false,
        },
        stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
        },
        yaxis: {
        opposite: store.direction ? true : false,
        labels: {
            style: {
            colors: store.isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
            },
        },
        },
        xaxis: {
        categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
        ],
        labels: {
            style: {
            colors: store.isDark ? "#CBD5E1" : "#475569",
            fontFamily: "Inter",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        },

        fill: {
        opacity: 1,
        },
        tooltip: {
        y: {
            formatter: function (val) {
            return "$ " + val + " thousands";
            },
        },
        },
        colors: ["#4669FA", "#0CE7FA", "#FA916B"],
        grid: {
        show: true,
        borderColor: store.isDark ? "#334155" : "#E2E8F0",
        strokeDashArray: 10,
        position: "back",
        },
        responsive: [
        {
            breakpoint: 600,
            options: {
            legend: {
                position: "bottom",
                offsetY: 8,
                horizontalAlign: "center",
            },
            plotOptions: {
                bar: {
                columnWidth: "80%",
                },
            },
            },
        },
        ],
    },
    };
})
</script>

<style>

</style>
