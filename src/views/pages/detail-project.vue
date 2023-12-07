<template>
	<div>
		<card title="Laporan Harian" class-name="my-4">
			<div class="grid grid-cols-2 gap-4">
				<vue-button
					text="Clock In"
					btnClass="btn btn-primary hover:light"
					@click="setType('clockin')"
				/>
				<vue-button
					text="Clock Out"
					btnClass="btn btn-success hover:light"
					@click="setType('clockout')"
				/>
			</div>
			<div class="mt-3">
				<router-link to="/" class="hover:underline text-sm">
					Catatan Kehadiran
				</router-link>
			</div>
		</card>
		<div
			class="bg-white lg:w-[200px] border rounded-md flex p-2 justify-around"
		>
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
						<span class=""> CODE -ABC </span>
					</div>
					<div>
						<div>
							<span class="font-bold text-[12px] lg:text-lg">
								Rp 9.999.999.999
							</span>
						</div>
						<div class="flex justify-end">
							<span class="text-sm"> 01-01-2023 </span>
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
							<span class="font-bold text-lg"> Progress </span>
						</div>
						<div>
							<span>Progress</span>
							<ProgressBar height="h-3" parentClass="mt-2">
								<Bar
									:value="80"
									barColor="bg-[#CE7722]"
									showValue />
								<Bar
									:value="10"
									barColor="bg-[#FFE5B4]"
									showValue
									colorTextClass="text-black" />
							</ProgressBar>
						</div>
						<div class="mt-3">
							<span>Deviasi</span>
							<ProgressBar height="h-3" parentClass="mt-2">
								<Bar
									:value="40"
									barColor="bg-[#CE7722]"
									showValue />
								<Bar
									:value="40"
									barColor="bg-[#FFE5B4]"
									showValue
									colorTextClass="text-black" />
							</ProgressBar>
						</div>
					</template>
				</single-accordion>
				<single-accordion title="Keterangan" isOpen parentClass="mt-2">
					<template #content>
						<div>
							<div>
								<span> Pengawas : Budi Raharja </span>
							</div>
							<div>
								<span> Sisa Hari : 61 Hari </span>
							</div>
						</div>
					</template>
				</single-accordion>
			</card>
		</div>
	</div>
</template>

<script setup>
import TextAreaInput from '@/components/Textarea';
import InformationColor from '@/components/attandance-pages/InformationColor.vue';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import SingleAccordion from '@/components/Accordion/SingleAccordion.vue';
import ProgressBar from '@/components/ProgressBar';
import Bar from '@/components/ProgressBar/Bar';
import VueButton from '@/components/Button/index.vue';
import Checkbox from '@/components/Checkbox/index.vue';
import { formatInformations } from '@/constant/static';
import { computed, onMounted, ref } from 'vue';
import { useThemeSettingsStore } from '@/store/themeSettings';
import DropZoneVue from '@/components/Fileinput/DropZone.vue';
import { useRoute, useRouter } from 'vue-router';

const store = useThemeSettingsStore();

const router = useRouter();
const route = useRoute();

const selected = ref([]);

const options = [
	{
		value: 'Orange',
		label: 'Task I',
	},
	{
		value: 'Apple',
		label: 'Task II',
	},
	{
		value: 'Banana',
		label: 'Task III',
	},
];


// Ref for video element
const videoElement = ref(null);

const videoState = ref(null);
const imgState = ref(null);
const typeAttendance = ref('');

const setType = (type) => {
	typeAttendance.value = type;
	router.push(`/attendance/${type}/${route.params.id}`)
};

const isOpenCamera = ref(false);
const startCamera = (type) => {
	isOpenCamera.value = true;
	typeAttendance.value = type;
};
const clockInPreview = ref(null);


const submit = () => {};
</script>

<style></style>
