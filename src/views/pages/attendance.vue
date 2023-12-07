<template>
<div>
    <card :title="route.params.type">
        <div class="mt-4">
            <div class="text-md font-bold mb-2">Description</div>
            <TextAreaInput />
            <div class="my-3">
                <div class="my-2">
                    <span class="font-bold text-sm pb-2">
                        Upload Proof Of Work
                    </span>
                </div>
                <DropZoneVue />
            </div>
            <vue-button 
                v-if="!clockInPreview"
                text="Lets Attendance" 
                btn-class="w-[100%] btn-dark"
                @click.prevent="startCamera($route.params.type)"
            />
        </div>
        <div v-if="clockInPreview" class="flex space-x-4">
            <div class="mb-4 flex-none">
                <div
                    class="mx-auto mt-6 rounded-md"
                >
                    <div class="text-md font-bold mb-2">Attandance Review</div>
                    <img
                        :src="clockInPreview"
                        class="object-cover h-full w-full block rounded-md"
                        width="300"
                    />
                </div>
            </div>
        </div>
        <div v-if="clockInPreview" class="mt-3 flex justify-end gap-2">
            <vue-button 
                text="Remove Attendance" 
                btn-class="btn btn-danger light rounded-lg"
                @click="removeAttendance"
            />
            <vue-button text="Submit" btn-class="btn btn-dark rounded-lg" />
        </div>
    </card>
    <ModalAttendance
        v-if="isOpenCamera"
        sizeClass="max-w-2xl"
        :active-modal="isOpenCamera"
        :type="route.params.type"
        @close="isOpenCamera = false"
        @upload="upload" 
    />
</div>
</template>

<script setup>
import Card from '@/components/Card';
import TextAreaInput from '@/components/Textarea';
import DropZoneVue from '@/components/Fileinput/DropZone.vue';
import { useRoute } from 'vue-router';
import ModalAttendance from '@/components/Modal/Attandance.vue';
import VueButton from '@/components/Button/index.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

const route = useRoute();

const isOpenCamera = ref(false);
const startCamera = (type) => {
	isOpenCamera.value = true;
};


const clockInPreview = ref(null);
const upload = (data) => {
	clockInPreview.value = data?.src;
};

const removeAttendance = () => {
    clockInPreview.value = null;
    toast.success('Kehadiran Berhasil di hapus', {
        timeout: 2000,
    });
}


</script>

<style>

</style>
