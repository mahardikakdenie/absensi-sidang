<template>
	<modal :active-modal="activeModal" @close="$emit('close')">
		<div>
			<p v-if="location">fullAddress : {{ fullAddress }}</p>
			<div v-if="isLoading" class="loading">
				<div class="effect-1 effects"></div>
				<div class="effect-2 effects"></div>
				<div class="effect-3 effects"></div>
			</div>
			<div class="relative aspect-w-16 aspect-h-9">
				<video
					id="video-webcam"
					ref="videoElement"
					autoplay
					class="object-cover w-full h-full" 
				/>
				<div
					class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					<img
						v-if="imgUrlState"
						:src="imgUrlState"
						alt=""
						class="object-cover w-full h-full" 
					/>
				</div>
			</div>

			<div class="mt-4">
				<vue-button
					v-if="!imgUrlState"
					text="Take"
					btnClass="btn-outline-primary btn-sm"
					:isDisabled="isLoading"
					@click="take" 
				/>
				<vue-button
					v-if="imgUrlState"
					text="Upload"
					btnClass="btn-outline-primary btn-sm"
					@click="upload" 
				/>
			</div>
		</div>
	</modal>
</template>

<script setup>
import axios from 'axios';
import VueButton from '@/components/Button';
import Modal from '@/components/Modal/index.vue';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
const props = defineProps({
	activeModal: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: 'clockin',
	},
});

const location = ref(null);
const fullAddress = ref('');

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	} else {
		alert('Geolocation is not supported by your browser.');
	}
};

const handleSuccess = (position) => {
	getAddressFromCoords(position.coords.latitude, position.coords.longitude);
	location.value = {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude,
	};
};

const handleError = (error) => {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			alert('User denied the request for Geolocation.');
			break;
		case error.POSITION_UNAVAILABLE:
			alert('Location information is unavailable.');
			break;
		case error.TIMEOUT:
			alert('The request to get user location timed out.');
			break;
		case error.UNKNOWN_ERROR:
			alert('An unknown error occurred.');
			break;
		default:
			alert('An unknown error occurred.');
	};

	emit('close');
};

const videoState = ref(null);

const imgState = ref(null);
const imgUrlState = ref(null);
const isLoading = ref(false);

const emit = defineEmits(['close', 'upload']);

const getAddressFromCoords = async (lat, long) => {
	const endpointMaps = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`;
	const response = await axios.get(endpointMaps);
	const { display_name } = response?.data ?? '';
	fullAddress.value = display_name;
};

// ...
const upload = async () => {
	try {
		if (imgState.value) {
			// Convert the image to a Blob
			const img = await fetch(imgState.value.src).then((res) =>
				res.blob()
			);
			const data = {
				img,
				src: imgState.value.src,
				type: props.type,
				fullAddress: fullAddress.value,
				lat: location.value.latitude,
				long: location.value.longitude,
			};
			emit('close');
			emit('upload', data);
			imgState.value = null;
			imgUrlState.value = null;
		}
	} catch (error) {
		console.error('Error uploading image:', error);
		alert('An error occurred. Please try again.');
	}
};

const take = () => {
	if (videoElement.value) {
		const width = videoElement.value.offsetWidth;
		const height = videoElement.value.offsetHeight;

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const context = canvas.getContext('2d');

		context.drawImage(videoElement.value, 0, 0, width, height);

		const img = new Image();
		img.src = canvas.toDataURL('image/png');

		img.onload = () => {
			imgState.value = img;
			imgUrlState.value = img.src;
		};
	}
};

const videoElement = ref(null);
// watch(() => props.activeModal, (newVal) => {
// 		if (newVal) {
// 			setupWebcam();
// 		}
// 	},
// 	{ immediate: true }
// );

onBeforeMount(() => {
	if (props.activeModal) {
		setupWebcam();
	}
});

const setupWebcam = () => {
	const video = document.getElementById('video-webcam') || videoElement;

	if (video) {
		isLoading.value = true;
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia ||
			navigator.oGetUserMedia;

		if (navigator.getUserMedia) {
			navigator.getUserMedia({ video: true }, handleVideo, videoError);
		}

		function handleVideo(stream) {
			isLoading.value = false;
			const videoTag = document.getElementById('video-webcam');
			videoTag.srcObject = stream;
			videoState.value = video;
		}

		function videoError(e) {
			isLoading.value = false;
			alert('Izinkan kami mengakses kamera untuk kehadiran');
			emit('close');
		}
	}
	getLocation();
};
</script>
