<template>
	<div>
		<modal :active-modal="activeModal" @close="close">
			<!-- DATE -->
			<FormGroup name="Time In" label="Masukan Waktu Masuk" class="mb-2">
				<flat-pickr
					v-model="timeIn"
					class="form-control"
					id="d1"
					placeholder="Masukan Jam Masuk"
					:config="{
						enableTime: true,
						noCalendar: true,
						dateFormat: 'H:i',
					}" />
			</FormGroup>
			<!-- DATE -->
			<FormGroup name="TimeOut" label="Masukan Waktu Keluar">
				<flat-pickr
					v-model="timeOut"
					class="form-control"
					id="d1"
					placeholder="Masukan Jam Keluar"
					:config="{
						enableTime: true,
						noCalendar: true,
						dateFormat: 'H:i',
					}" />
			</FormGroup>

			<vue-select v-if="false" label="User Selected">
				<vSelect v-model="users" multiple :options="userOptions">
					<template #option="{ label }">
						<div>
							<div v-if="!isLoading" class="flex items-center">
								<div class="text-start">
									<span
										class="text-sm text-slate-600 dark:text-slate-300 capitalize text-star">
										{{ label }}
									</span>
								</div>
							</div>
						</div>
					</template>
				</vSelect>
			</vue-select>

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
import FormGroup from '@/components/FromGroup';
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
		timeIn.value = store?.typeAction?.data?.shift?.[0]?.shift?.timeIn ?? '';
		timeOut.value =
			store?.typeAction?.data?.shift?.[0]?.shift?.timeOut ?? '';
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
	const typeIsUpdate = store?.typeAction?.shifts.length > 0;
	if (typeIsUpdate) {
		const params = {
			timeIn: timeIn?.value,
			timeOut: timeOut?.value,
		};
		const callback = (res) => {
			if (res?.data?.meta?.status) {
				close();
				toast?.success('Shift Sudah di update Harap Refresh');
			}
		};

		const err = (e) => {
			console.log(e);
		}

		projectApi?.updateShift(store?.typeAction?.shifts?.[0]?.id, params, callback, err);
	} else {
		const userIds = store?.typeAction?.data?.users?.map(
			(user) => user?.user_id
		);
		const params = {
			projectIds: [props?.projectId],
			userIds: userIds,
			timeIn: timeIn?.value,
			timeOut: timeOut?.value,
		};
		const callback = (res) => {
			if (res?.data?.meta?.status) {
				close();
				toast?.success('Shift Sudah di tambahkan Harap Refresh');
			}
		};
		const err = (e) => {
			console.log(e);
		};
		projectApi.createShift(params, callback, err);
	}
};

onMounted(() => {
	getUserSelected();
});
</script>
