<template>
	<div>
		<modal 
			:active-modal="activeModal" 
			title="Membuat Shift" 
			@close="close"
			sizeClass="max-w-full"
		>

			<div class="grid grid-cols-12">
				<div class="col-span-8 border-r">
					<div class="p-2">
						<div class="flex justify-start">
							<div 
								:class="{
										'border-primary-500 text-primary-500': tabLeft === 'shift', 
										'border-b-[#ffff]': tabLeft !== 'shift' 
									}"
								class="p-2 text-sm hover:text-primary-500 border-b-2 hover:border-b-primary-500 cursor-pointer"
							>
								<span class="text-sm">
									Shift
								</span>
							</div>
						</div>

						<!--  -->


						<hr class="my-2">

						<div class="mt-4">
							<div class="p-2 border-b hover:bg-gray-200 cursor-pointer">
								<header class="flex justify-between items-center">
									<div  class="flex space-x-2 sm:space-x-3 items-center rtl:space-x-reverse">
										<div class="flex-none">
											<div class="h-10 w-10 rounded-md sm:text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize text-sm">
												1
											</div>
										</div>
										<div>
											<div class="text-sm font-bold">
												Time In : {{ timeIn }} WIB - TimeOut : {{ timeOut }} WIB
											</div>
											<div class="mt-2">
												<div class="my-2">
													<vue-badge 
														label="berlangsung" 
														badge-class="text-sm bg-primary-500 text-white" 
													/>
												</div>
												<div>
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
					<div class="p-2 border-b">
						<div class="grid grid-cols-5 gap-2">
							<div 
								v-for="(tab, index) in rightTabs"
								:key="i"
								class="p-2 text-sm text-center hover:text-primary-500 w-100  border-b-2 border-b-[#ffff] hover:border-b-primary-500 cursor-pointer"
							>
								<span class="text-sm text-center whitespace-nowrap">
									{{ tab?.label }}
								</span>
							</div>
						</div>
					</div>	
				</div>
			</div>

			<template #footer>
				<VueButton
					text="Cancel"
					btn-class="btn-sm btn btn-danger"
					@click="close" 
				/>
				<VueButton
					text="Submit"
					btn-class="btn-sm btn btn-primary"
					@click="submit" 
				/>
			</template>
		</modal>
	</div>
</template>
<script setup>
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

const timeIn = ref();
const timeOut = ref();
const users = ref([]);
const store = useDataTableStore();
const toast = useToast();
const tabLeft = ref('shift');
const rightTabs = [
	{
		label: 'Anggota',
		key: 'anggota'
	}
];

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
		getUserSelected();
		timeIn.value = store?.typeAction?.data?.timeIn;
		timeOut.value = store?.typeAction?.data?.timeOut;
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
	getUserSelected();
	timeIn.value = store?.typeAction?.data?.timeIn;
	timeOut.value = store?.typeAction?.data?.timeOut;
});
</script>
