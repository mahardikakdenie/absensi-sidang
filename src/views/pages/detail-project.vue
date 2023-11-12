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

            <single-accordion parentClass="mt-3" title="Project Name">
                <template #content>
                    <div class="legend-ring px-0">
                        <apexchart
                            type="bar"
                            height="420"
                            :options="columnCharthomeComputed.chartOptions"
                            :series="columnCharthomeComputed.series"
                        />
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
import SingleAccordion from '@/components/Accordion/SingleAccordion.vue'
import {
    formatInformations
} from '@/constant/static';
import { computed } from 'vue';
import { useThemeSettingsStore } from '@/store/themeSettings'

const store = useThemeSettingsStore();

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
