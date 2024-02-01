<template>
	<div>
		<modal :active-modal="activeModal" sizeClass="max-w-full" title="Membuat Shift" @close="close">

			<div class="grid grid-cols-12">
				<div class="col-span-8 border-r">
					<div class="p-2">
						<div class="flex justify-between">
							<div></div>
							<div>
								<vue-button text="Buat Shift" btn-class="btn btn-sm btn-primary light"
									@click="isFormVisible = !isFormVisible" />
							</div>
						</div>
						<!--  -->

						<div v-if="isFormVisible" class="p-2 mt-2">
							<div class="mb-2">
								<span class="text-sm">Buat Shift</span>
							</div>
							<div>
								<!-- Vue Select -->
								<vue-select>
									<vSelect placeholder="Masukan Type" :options="['Reguler', 'Lembur']">
										<template #option="{ label }">
											<div>
												{{ label }}
											</div>
										</template>
									</vSelect>
								</vue-select>

								<FormGroup
								label="Timein"
								name="d1"
								>
								<flat-pickr
									v-model="timeIn"
									class="form-control"
									id="d1"
									placeholder="hh: mm" 
								/>
								</FormGroup>

								<FormGroup
								label="Time Out"
								name="d1"
								>
								<flat-pickr
									v-model="timeOut"
									class="form-control"
									id="d1"
									placeholder="yyyy, dd M"
								/>
								</FormGroup>
							</div>
						</div>


						<!--  -->
						<hr class="my-2">
						<div class="mt-4">
							<div v-for="(shift, index) in shifts" :key="index"
								class="p-2 border-b hover:bg-gray-200 cursor-pointer">
								<header class="flex justify-between items-center">
									<div class="flex space-x-2 sm:space-x-3 items-center rtl:space-x-reverse">
										<div class="flex-none">
											<div
												class="h-10 w-10 rounded-md sm:text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize text-sm">
												{{ index + 1 }}
											</div>
										</div>
										<div>
											<div class="text-sm font-bold">
												Time In : {{ shift?.timeIn }} WIB - TimeOut : {{ shift?.timeOut }} WIB
											</div>
											<div class="mt-2">
												<div class="my-2">
													<span class="block w-full">
														<span
															class="inline-block text-success-500 bg-success-300 px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-sm">
															Berlangsung
														</span>
													</span>
												</div>
												<div class="mt-2 ml-4">
													<user-assign />
												</div>
											</div>
										</div>
									</div>
								</header>
							</div>
						</div>
					</div>
				</div>

				<div class="col-span-4">
					<!-- Tabs -->
					<div class="p-2 border-b">
						<div class="grid grid-cols-5 gap-2">
							<div v-for="(tab, index) in rightTabs" :key="index"
								class="p-2 text-sm text-center hover:text-primary-500 w-100  border-b-2 border-b-[#ffff] hover:border-b-primary-500 cursor-pointer">
								<span class="text-sm text-center whitespace-nowrap">
									{{ tab?.label }}
								</span>
							</div>
						</div>
					</div>
					<!-- End Tabs -->

					<!-- Content -->
					<div class="border-b p-2 mt-2 grid grid-cols-12 hover:bg-gray-200">
						<div class="col-span-1">
							<img :src="userDummyImage" width="60" class="object-cover rounded-full">
						</div>
						<div class="flex items-center col-span-8">
							<span class="text-sm">
								Mahardika Kessuma denie
							</span>
						</div>
						<div class="col-span-3 flex items-center justify-end">
							<vue-button btn-class="btn btn-sm btn-light light" btnTooltip="Hapus Anggota"
								icon-class="text-red-500 text-lg" icon="material-symbols:delete" />
							<vue-button btn-class="btn btn-sm btn-light light" btnTooltip="Atur Shift"
								icon-class="text-primary-500 text-lg" icon="mdi:approve" />
						</div>
					</div>
					<!-- End Content -->
				</div>
			</div>

			<template #footer>
				<VueButton text="Cancel" btn-class="btn-sm btn btn-danger" @click="close" />
				<VueButton text="Submit" btn-class="btn-sm btn btn-primary" @click="submit" />
			</template>
		</modal>
	</div>
</template>
<script setup>
import TextInput from '@/components/Textinput';
import Modal from '@/components/Modal';
import UserAssign from '@/components/DataTable/column/assign.vue';
import VueBadge from '@/components/Badge';
import VueButton from '@/components/Button';
import userApi from '@/helpers/user';
import { computed, onMounted, ref, watch } from 'vue';
import VueSelect from '@/components/Select/VueSelect';
import vSelect from 'vue-select';
import projectApi from '@/helpers/projects';
import { useDataTableStore } from '@/store/data-table';
import { useToast } from 'vue-toastification';
import { duplicateVar } from '@/constant/helpers';
import { userDummyImage } from '@/constant/static';
import { getDataShifts } from '@/helpers/shift';
import FormGroup from '@/components/FromGroup';


const timeIn = ref();
const timeOut = ref();
const users = ref([]);
const store = useDataTableStore();
const toast = useToast();
const tabLeft = ref('shift');
const shifts = ref([]);
const rightTabs = [
	{
		label: 'Anggota',
		key: 'anggota'
	}
];

const isFormVisible = ref(false);

const props = defineProps({
	activeModal: {
		type: Boolean,
		default: false,
	},
	projectId: {
		type: [String, Number],
		default: null,
	},
});

const fetchParams = computed(() => ({
	entities: '',
	project_ids: props?.projectId ? [props?.projectId] : [],
}));

const emits = defineEmits(['submit', 'close']);

watch(
	() => props?.projectId,
	(value) => {
		if (value) {
			getDataShift();
		}
	}
);

const isLoading = ref(false);
const isFetching = ref(false);
const userOptions = ref([]);
const getUserSelected = (projectId) => {
	isLoading.value = true;
	const params = fetchParams?.value;
	isFetching.value = true;
	const callback = (response) => {
		isLoading.value = false;
		if (response?.data?.meta?.status) {
			const data = response?.data?.data;
			userOptions.value = data?.map((curr) => ({
				label: curr?.name,
				id: curr?.id,
			}));
		}
		isFetching.value = false;
	};
	const err = (e) => {
		console.error(e);
		isFetching.value = false;
	};

	userApi.getUserSelected(params, callback, err);
};

const close = () => {
	emits('close');
};

const getDataShift = () => {
	const params = {
		project_id: props?.projectId,
		entities: 'projectShift'
	}
	const callback = (res) => {
		if (res?.data?.meta?.status) {
			const data = res?.data?.data;
			shifts.value = data;
		}
	};
	const err = (e) => {
		console.error(e);
	};

	getDataShifts(params, callback, err);
};

const submit = () => {
	// const typeIsUpdate = store?.typeAction?.shifts.length > 0;
	// const userIds = store?.typeAction?.data?.users?.map(
	// 	(user) => user?.user_id
	// );
	// if (typeIsUpdate) {
	// 	const params = {
	// 		timeIn: timeIn?.value,
	// 		timeOut: timeOut?.value,
	// 		userIds: userIds,
	// 	};
	// 	const callback = (res) => {
	// 		if (res?.data?.meta?.status) {
	// 			close();
	// 			toast?.success('Shift Sudah di update Harap Refresh');
	// 		}
	// 	};

	// 	const err = (e) => {
	// 		console.log(e);
	// 	}

	// 	projectApi?.updateShift(store?.typeAction?.shifts?.[0]?.id, params, callback, err);
	// } else {
	// 	const params = {
	// 		projectIds: [props?.projectId],
	// 		userIds: userIds,
	// 		timeIn: timeIn?.value,
	// 		timeOut: timeOut?.value,
	// 	};
	// 	const callback = (res) => {
	// 		if (res?.data?.meta?.status) {
	// 			close();
	// 			toast?.success('Shift Sudah di tambahkan Harap Refresh');
	// 		}
	// 	};
	// 	const err = (e) => {
	// 		console.log(e);
	// 	};
	// 	projectApi.createShift(params, callback, err);
	// }
	const params = {
		timeIn: timeIn?.value,
		timeOut: timeOut?.value,
		id: props?.projectId,
	};

	emits('submit', params);
};

onMounted(() => {
	getDataShift();
	timeIn.value = store?.typeAction?.data?.timeIn;
	timeOut.value = store?.typeAction?.data?.timeOut;
});
</script>
