<template>
	<Card title="Riwayat Kehadiran">
		<div class="grid sm:grid-cols-4 grid-cols-1 gap-3">
			<card
				v-for="(attendance, index) in attendances"
				:key="index"
				className="bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-lg hover:transform hover:scale-105 transition-transform cursor-pointer p-1">
				<div class="flex justify-between items-center p-1">
					<div class="flex items-center space-x-1">
						<icon
							icon="carbon:time"
							class="text-gray-600 text-xs" />
						<span class="text-gray-600 text-xs font-bold">{{
							attendance.date
						}}</span>
					</div>
					<div class="flex space-x-1">
						<vue-badge
							:label="attendance.type"
							:badgeClass="`text-xs ${setBadgeColor(attendance.type)} text-white bg-opacity-75 hover:animate-bounce `" />
						<vue-badge
							label="On Time"
							badgeClass="bg-success-500 text-xs text-white bg-opacity-75 hover:animate-bounce" />
					</div>
				</div>
				<div class="mt-1 p-1">
					<div class="flex justify-between">
                        <div class="text-sm font-medium text-gray-600">
                            Time
                        </div>
                        <div class="text-sm font-bold">{{ attendance.time }}</div>
					</div>
				</div>
			</card>
		</div>

        <div class="p-4 flex justify-center">
            <Pagination
            v-if="attendanceMeta"
            :current="page"
            :total="attendanceMeta.total"
            :per-page="paginate"
            @page-changed="page = $event"
        />
        </div>
	</Card>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
// import dayjs from 'dayjs';
import Icon from '@/components/Icon';
import VueBadge from '@/components/Badge';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { getDataAttendanceLogs } from '@/helpers/attendances';
import Pagination from '@/components/Pagination'
import { onMounted, ref, watchEffect } from 'vue';
const toast = useToast();
const route = useRoute();


const attendances = ref();
const attendanceMeta = ref(null);
const valuePaginate = window.innerWidth > 768 ? 8 : 2
const paginate = ref(valuePaginate);
const page = ref(1);

const getDataAttendanceLog = () => {
	const params = {
        paginate: paginate.value,
        page: page.value,
    };
	const callback = (response) => {
		if (response.data.meta.status) {
			attendances.value = response.data.data;
            attendanceMeta.value = response.data.meta;
		}
	};
	const err = (e) => {
		console.log(e);
	};

	getDataAttendanceLogs(params, callback, err);
};

const setBadgeColor = (type) => {
    let color = 'bg-success-500';
    if (type === 'clockout') {
        color = 'bg-primary-500'
    }

    return color;
};

watchEffect(() => {
    getDataAttendanceLog();
});

onMounted(() => {
	getDataAttendanceLog();
    console.log('window => ', window.innerWidth);
});
</script>

<style></style>
