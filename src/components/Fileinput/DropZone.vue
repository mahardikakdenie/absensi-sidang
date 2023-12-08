<template>
	<div>
		<div
			v-bind="getRootProps()"
			class="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center"
			:class="[typeCursor]">
			<div v-if="files.length === 0">
				<input v-bind="getInputProps()" class="hidden" />
				<img
					src="@/assets/images/svg/upload.svg"
					alt=""
					class="mx-auto mb-4" 
                />
				<p
					class="text-sm text-slate-500 dark:text-slate-300 font-light">
					Drop files here or click to upload.
				</p>
			</div>
			<div class="flex space-x-4">
				<div v-for="(file, i) in files" :key="i" class="mb-4 flex-none">
					<div class="relative mx-auto mt-6 rounded-md overflow-hidden">
						<img
							:src="file.preview"
							width="48"
							class="object-cover h-full w-full block rounded-md" 
                        />
					</div>
				</div>
				
			</div>
		</div>
		<div
			v-if="files.length !== 0"
			class="mt-3 flex justify-end"
		>
			<vue-button text="Remove" btn-class="btn btn-danger light btn-sm relative" />
		</div>
	</div>
</template>

<script setup>
import { useDropzone } from 'vue3-dropzone';
import { computed, ref, watch } from 'vue';
import VueButton from '@/components/Button';
import Icon from '@/components/Icon';
const files = ref([]);
function onDrop(acceptFiles) {
	files.value = acceptFiles.map((file) =>
		Object.assign(file, {
			preview: URL.createObjectURL(file),
		})
	);
}

const emit = defineEmits(['upload']);

watch(files, (value) =>  {
	console.log('value => ', value);
	emit('upload', value);
});

const { getRootProps, getInputProps, ...rest } = useDropzone({
	onDrop,
});

const typeCursor = computed(() =>
	files.value.length === 0 ? 'cursor-pointer' : ' pointer-events-none'
);
</script>
