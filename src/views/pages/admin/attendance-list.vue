<template>
<div>
    <card className="mb-2">
        <div class="grid grid-cols-6 gap-2">
            <BoxSummary :statistics="statistics" />
        </div>
    </card>
    <card>
        <data-table title="Attendance List" />
    </card>
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import BoxSummary from '@/components/Card/box-summary.vue';
import DataTable from '@/components/DataTable/index.vue';
import { computed, onMounted, ref } from 'vue';
import { getAllData, getDataSummary } from "@/helpers/attendances";
import { useDataTableStore } from '@/store/data-table';
const userDummyImage = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';


const store = useDataTableStore();

const statistics = ref([
    {
        title: "All",
        count: "0",
        bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        text: "text-success-900",
        icon: "icon-park:data-all",
    },
    {
        title: "ClockIn",
        count: "3,564",
        bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        text: "text-info-500",
        icon: "heroicons:shopping-cart",
    },
    {
        title: "ClockOut",
        count: "564",
        bg: "bg-[#FFEDE6] dark:bg-slate-900	",
        text: "text-warning-500",
        icon: "heroicons:cube",
    },
    {
        title: "Late",
        count: "564",
        bg: "bg-[#FFEDE6] dark:bg-slate-900	",
        text: "text-warning-500",
        icon: "heroicons:cube",
    },
]);

const headers = [
	{ label: 'Name', field: 'name' },
	{ label: 'Project Name', field: 'project' },
	{ label: 'Full Address', field: 'full_address' },
	{ label: 'Type', field: 'type' },
];

const actions = [
	{
		key: 'draft',
		icon: 'fluent-mdl2:unpublish-content',
		tooltipText: 'Ubah Status menjadi draft/unpublish',
		btnClass: 'btn btn-sm text-danger-400',
	},
	{
		key: 'publish',
		icon: 'fluent-mdl2:publish-content',
		tooltipText: 'Ubah Status menjadi publish',
		btnClass: 'btn btn-sm text-success-600',
	},
];


const fetchParams = computed(() => ({
    entities: 'project.division,user.profile.medias',
    admin_mode: true,
}));

const getDataAttendance = () => {
    const params = fetchParams?.value
    const callback = (res) => {
        const data = res?.data?.data;
        const configMapping = data?.map(curr => ({
            image: curr?.user?.profile?.medias?.url ?? userDummyImage,
            name: curr?.user?.name,
            status: curr?.status ?? null,
            project: curr?.project?.name,
            type: curr?.type,
            full_address: curr?.full_address ?? '-',
        }))
        store?.setData(configMapping);
    };
    const err = (e) => {
        console.log(e);
    }

    getAllData(params, callback, err);
};

const getDataAttendanceSummary = () => {
    const callback = (res) => {
        const data = res?.data?.data;
        console.log(data);
        statistics.value[0].count = data?.all ?? 0;
        statistics.value[1].count = data?.clockin ?? 0;
        statistics.value[2].count = data?.clockout ?? 0;
        statistics.value[3].count = data?.late ?? 0;
    };
    const err = (e) => {
        console.log(e);
    }

    getDataSummary({admin_mode: true}, callback, err);
};

onMounted(() => {
    store?.setHeaders(headers);
    store?.setActions(actions);
    store?.setNameConfig(null);
    getDataAttendance();
    getDataAttendanceSummary();
});
</script>

<style>

</style>
