<template>
	<div>
		<div
			class="bg-white lg:w-[200px] border rounded-md flex p-2 justify-around">
			<information-color
				v-for="(information, index) in formatInformations"
				:key="index"
				:color-code="information.colorCode"
				:label="information.label" />
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
					isOpen>
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
										icon="typcn:edit" />
								</div>
							</div>
							<div class="flex flex-wrap space-x-rb mt-4">
								<Checkbox
									v-for="(option, index) in options"
									:key="index"
									v-model="selected"
									:value="option.value"
									:label="option.label"
									activeClass="ring-primary-500 bg-primary-500"
									class="ml-2" />
							</div>
						</div>
					</template>
				</single-accordion>
				<div class="mt-4">
					<div class="text-md font-bold">Desctipription :</div>
					<div class="font-light text-justify">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Velit, veniam!
					</div>
				</div>
				<div class="mt-4">
					<div class="flex justify-center gap-2">
						<vue-button
							text="ClockIn"
							btnClass="btn-outline-primary btn-sm"
							@click="startCamera" />
						<vue-button
							text="ClockOut"
							btnClass="btn-outline-primary btn-sm" />
					</div>
				</div>
			</card>
		</div>
        <ModalAttendance v-if="isOpenCamera" :active-modal="isOpenCamera" @close="isOpenCamera = false" />
	</div>
</template>

<script setup>
// import { useMediaRecorder } from 'vue-media-recorder';
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
import ModalAttendance from '@/components/Modal/Attandance.vue'

const store = useThemeSettingsStore();

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

const isOpenCamera = ref(false);
const videoState = ref(null);
const imgState = ref(null);

const startCamera = () => {
	isOpenCamera.value = true;
};
</script>

<style></style>
