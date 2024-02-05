<template>
<div>
    <card className="mb-2">
        <div class="grid grid-cols-6 gap-2">
            <BoxSummary :statistics="statistics" />
        </div>
    </card>
    <card>
        <data-table 
            title="Attendance List"
            :is-loading="isLoading"
        />
    </card>
    <ModalAttendanceDetail 
        :activeModal="isAttendanceModalVisible" 
        :data="attendanceData" 
        @close="isAttendanceModalVisible = false" 
    />
</div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import BoxSummary from '@/components/Card/box-summary.vue';
import DataTable from '@/components/DataTable/index.vue';
import ModalAttendanceDetail from '@/components/Modal/AttendanceDetail.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { getAllData, getDataSummary } from "@/helpers/attendances";
import { useDataTableStore } from '@/store/data-table';
import { useRoute } from 'vue-router';
const userDummyImage = 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg';

const isLoading = ref(false);

const store = useDataTableStore();

const attendanceData = ref();
const isAttendanceModalVisible = ref(false);

const statistics = ref([
    {
        key: 'all',
        title: "All",
        count: "0",
        bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        text: "text-success-900",
        icon: "icon-park:data-all",
    },
    {
        key: 'clockin',
        title: "Absen Masuk",
        count: "3,564",
        bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        text: "text-info-500",
        icon: "heroicons:shopping-cart",
    },
    {
        key: 'clockout',
        title: "Absen Keluar",
        count: "564",
        bg: "bg-[#FFEDE6] dark:bg-slate-900	",
        text: "text-warning-500",
        icon: "heroicons:cube",
    },
    {
        key: 'late',
        title: "Telat",
        count: "564",
        bg: "bg-[#FFEDE6] dark:bg-slate-900	",
        text: "text-warning-500",
        icon: "heroicons:cube",
    },
    {
        key: 'overtime',
        title: "Lembur",
        count: "0",
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
	{ label: 'Status', field: 'status' },
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


const perPage = ref(10);
const currentPage = ref(1);

/**
 * Watches the `per_page` property in the `meta` object of the store and updates the `perPage` value accordingly.
 *
 * @param {Function} getter - A function that returns the value to be watched (e.g., `() => store?.meta?.per_page`).
 * @param {Function} callback - A callback function to be executed when the watched value changes.
 * @returns {void}
 */
 watch(
	() => store?.meta?.per_page,
	(value) => {
		if (value) {
			console.log("🚀 ~ value:", value)
			perPage.value = value;
			getDataAttendance();
		}
	}
);

 watch(
	() => store?.meta?.current_page,
	(value) => {
		if (value) {
			console.log("🚀 ~ value:", value)
			currentPage.value = value;
			getDataAttendance();
		}
	}
);
const route = useRoute();
const meta = computed(() => store?.meta);
const summary = computed(() => route?.query?.summary);

watch(() => summary.value, (value) => {
    if (summary) {
        getDataAttendance();
    }
});

const fetchParams = computed(() => ({
    entities: 'project.division,user.profile.medias,media,user.roles.role,mediaProof,shift',
    admin_mode: true,
    paginate: perPage?.value,
    page: currentPage?.value,
    summary: summary.value,
}));

const getDataAttendance = () => {
    isLoading.value = true;
    const params = fetchParams?.value
    const callback = (res) => {
        const data = res?.data?.data;
        const meta = res?.data?.meta;
        isLoading.value = false;
        const configMapping = data?.map(curr => ({
            ...curr,
            image: curr?.user?.profile?.medias?.url ?? userDummyImage,
            name: curr?.user?.name,
            status: curr?.status ?? 'late',
            roles: curr?.user?.roles ?? [],
            project: curr?.project?.name,
            type: curr?.type,
            full_address: curr?.full_address ?? '-',
            project_address: curr?.project?.address,
            project_decription: curr?.project?.description,
            media_proof: curr?.media_proof?.url
        }))
        store?.setData(configMapping);
        store?.setMeta(meta);
    };
    const err = (e) => {
        console.log(e);
    }

    getAllData(params, callback, err);
};

const getDataAttendanceSummary = () => {
    const callback = (res) => {
        const data = res?.data?.data;
        statistics.value[0].count = data?.all ?? 0;
        statistics.value[1].count = data?.clockin ?? 0;
        statistics.value[2].count = data?.clockout ?? 0;
        statistics.value[3].count = data?.late ?? 0;
        statistics.value[4].count = data?.overtime ?? 0;
    };
    const err = (e) => {
        console.log(e);
    }

    getDataSummary({admin_mode: true}, callback, err);
};

watch(() => store?.typeAction, (value) => {
    if (value?.key === 'name-table') {
        attendanceData.value = value?.data;
        isAttendanceModalVisible.value = true;
    }
});

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
