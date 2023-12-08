<template>
	<Card>
		<div class="flex-col flex md:flex-row items-center">
			<div class="flex-0 mr-6">
				<div class="author-img w-[65px] h-[88px] rounded-[40px]">
					<img :src="t1" alt="" class="w-full h-full object-cover" />
				</div>
			</div>
			<div class="flex-1 text-center md:text-start mt-2">
				<div class="mb-4 text-base">
					Mahardika Kessuma Denie
					<vue-badge
						label="Penanggung Jawab"
						badgeClass="bg-primary-500 text-sm text-primary-500 bg-opacity-[0.12]" />
				</div>
				<div class="grid sm:grid-cols-5 grid-cols-1 sm:gap-0 gap-4">
					<div v-for="(field, index) in fields" :key="index">
						<div class="text-sm">{{ field }}</div>
						<div class="text-sm font-bold">
							{{ valueField[field] }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-5 mt-6">
			<div class="xl:col-span-8 col-span-12">
				<div
					class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-3">
					<div
						v-for="(item, i) in statistics"
						:key="i"
						:class="
							item.bg +
							' rounded-md p-2 bg-opacity-[0.15] dark:bg-opacity-50 text-center transition-all duration-300 hover:shadow-lg hover:bg-opacity-50'
						">
						<div
							class="mx-auto h-6 w-6 flex items-center justify-center rounded-full bg-white text-lg mb-2"
							:class="item.text">
							<Icon :icon="item.icon" />
						</div>
						<span
							class="block text-xs text-slate-600 font-medium dark:text-white"
							>{{ item.title }}</span
						>
						<span
							class="block text-sm text-slate-900 dark:text-white font-medium"
							>{{ item.count }}</span
						>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup>
import Card from '@/components/Card';
import t1 from '@/assets/images/all-img/t1.png';
import VueBadge from '@/components/Badge/index.vue';
import Icon from '@/components/Icon';

const statistics = [
	{
		title: 'Total Attendance',
		count: '64',
		bg: 'bg-info-500',
		text: 'text-info-500',
		percent: '25.67% ',
		icon: 'heroicons-outline:menu-alt-1',
	},
	{
		count: '45',
		title: 'ClockIn',
		bg: 'bg-success-500',
		text: 'text-success-500',
		percent: '8.67%',
		icon: 'heroicons-outline:chart-pie',
	},
	{
		title: 'ClockOut',
		count: '190',
		bg: 'bg-primary-500',
		text: 'text-primary-500',
		percent: '1.67%  ',
		icon: 'heroicons-outline:clock',
	},
	{
		title: 'Late',
		count: '$3,564',
		bg: 'bg-warning-500',
		text: 'text-warning-500',
		percent: '11.67%  ',
		icon: 'heroicons-outline:calculator',
	},
];

const fields = ['Project', 'Phone', 'Email Address', 'Divisi', 'Lokasi'];

const valueField = {
	Project: 'Project Name',
	Phone: '620876557892',
	'Email Address': 'test@email.com',
	Divisi: 'Jalan RAYA',
	Lokasi: 'Jalan Jakarta, Bandung',
};
</script>

<style></style>
