<template>
	<modal :active-modal="activeModal" @close="$emit('close')">
		<div>
			<p v-if="location">
				Latitude: {{ location.latitude }}, Longitude:
				{{ location.longitude }}
			</p>
			<div class="relative aspect-w-16 aspect-h-9">
				<video
					id="video-webcam"
					ref="videoElement"
					autoplay
					class="object-cover w-full h-full" />
				<div
					class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					<img
						v-if="imgUrlState"
						:src="imgUrlState"
						alt=""
						class="object-cover w-full h-full" />
				</div>
			</div>

			<div class="mt-4">
				<vue-button
					v-if="!imgUrlState"
					text="Take"
					btnClass="btn-outline-primary btn-sm"
					@click="take" />
				<vue-button
					v-if="imgUrlState"
					text="Upload"
					btnClass="btn-outline-primary btn-sm"
					@click="upload" />
			</div>
		</div>
	</modal>
</template>

<script setup>
import VueButton from '@/components/Button';
import Modal from '@/components/Modal/index.vue';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
const props = defineProps({
	activeModal: {
		type: Boolean,
		default: false,
	},
});

const location = ref(null);

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	} else {
		alert('Geolocation is not supported by your browser.');
	}
};

const handleSuccess = (position) => {
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
	}
};

const videoState = ref(null);

const imgState = ref(null);
const imgUrlState = ref(null);

// ...
const upload = () => {};
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
watch(
	() => props.activeModal, // Mengamati prop activeModal
	(newVal, oldVal) => {
		// Callback yang akan dijalankan ketika prop berubah
		if (newVal) {
			const video = document.getElementById('video-webcam') || videoElement;

			if (video) {
				navigator.getUserMedia =
					navigator.getUserMedia ||
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.msGetUserMedia ||
					navigator.oGetUserMedia;

				if (navigator.getUserMedia) {
					navigator.getUserMedia(
						{ video: true },
						handleVideo,
						videoError
					);
				}

				function handleVideo(stream) {
					video.srcObject = stream;
					videoState.value = video;
				}

				function videoError(e) {
					alert('Allow using the webcam for the demo!');
				}
			}
		}
	},
	{ immediate: true } // Opsi agar watch dijalankan saat komponen di-render pertama kali
);

onBeforeMount(() => {
	if (props.activeModal) {
		const video = document.getElementById('video-webcam') || videoElement;

		if (video) {
			navigator.getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia ||
				navigator.oGetUserMedia;

			if (navigator.getUserMedia) {
				navigator.getUserMedia(
					{ video: true },
					handleVideo,
					videoError
				);
			}

			function handleVideo(stream) {
				const videoTag = document.getElementById('video-webcam');
				videoTag.srcObject = stream;
				videoState.value = video;
			}

			function videoError(e) {
				alert('Allow using the webcam for the demo!');
			}
		}
		getLocation();
	}
});
</script>
