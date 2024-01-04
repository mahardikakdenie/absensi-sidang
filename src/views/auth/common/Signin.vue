<template>
	<form @submit.prevent="onSubmit" class="space-y-4">
		<Textinput
			label="Email"
			type="email"
			placeholder="Type your email"
			name="emil"
			v-model="email"
			:error="emailError"
			classInput="h-[48px]" 
		/>
		<Textinput
			label="Password"
			type="password"
			placeholder="8+ characters, 1 capitat letter "
			name="password"
			v-model="password"
			hasicon
			classInput="h-[48px]" 
		/>

		<div class="flex justify-between">
			<label class="cursor-pointer flex items-start">
				<input
					type="checkbox"
					class="hidden"
					@change="() => (checkbox = !checkbox)" />
				<span
					class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
					:class="
						checkbox
							? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
							: 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
					">
					<img
						src="@/assets/images/icon/ck-white.svg"
						alt=""
						class="h-[10px] w-[10px] block m-auto"
						v-if="checkbox" />
				</span>
				<span
					class="text-slate-500 dark:text-slate-400 text-sm leading-6"
					>Keep me signed in</span
				>
			</label>
			<router-link
				to="/forgot-password"
				class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
				>Forgot Password?</router-link
			>
		</div>
		<vue-button 
			text="SIgn In" 
			btn-class="btn btn-dark block w-full text-center"
			:is-loading="isLoading"
			:is-Disabled="isLoading"
			@click.prevent="onSubmit" 
		/>
	</form>
</template>
<script>
import Textinput from '@/components/Textinput';
import VueButton from '@/components/Button/index.vue'
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import authApi from '@/helpers/auth.js';
import client from '@/helpers/http-client';
import { ref } from 'vue';
export default {
	components: {
		VueButton,
		Textinput,
	},
	data() {
		return {
			checkbox: false,
		};
	},
	setup() {
		const isLoading = ref(false);
		// Define a validation schema
		const schema = yup.object({
			email: yup.string().required('Email is required').email(),
			password: yup.string().required('Password is required').min(8),
		});

		const toast = useToast();
		const router = useRouter();

		const formValues = {
			email: 'admin@mail.com',
			password: '123456789',
		};

		const { handleSubmit } = useForm({
			validationSchema: schema,
			initialValues: formValues,
		});
		// No need to define rules for fields

		const { value: email, errorMessage: emailError } = useField('email');
		const { value: password, errorMessage: passwordError } = useField('password');

		const onSubmit = handleSubmit((values) => {
			isLoading.value = true;
			const email = values.email;
			const password = values.password;

			const params = {
				email,
				password,
			};

			const callback = (res) => {
				isLoading.value = false;
				const data = res.data;
				if (data.meta.status) {
					checkCapabilities(data?.data?.access_token?.user);
					toast.success(' Login  successfully', {
						timeout: 2000,
					});

					const token = data.data.access_token?.token;
					localStorage.setItem('token', token);
					client.defaults.headers.Authorization = `Bearer ${token}`;
				} else {
					isLoading.value = false;
					toast.error(data.meta.message, {
						timeout: 2000,
					});
				}
			};

			const err = (e) => {
				isLoading.value = false;
				console.log(e);
			};

			authApi.login(params, callback, err);
		});

		const checkCapabilities = (user) => {
			const isAdminMode = ['superadmin', 'admin'];
			
			const checkCapabilities = user?.roles?.some(role => isAdminMode.includes(role?.role?.name));

			if (checkCapabilities) {
				router.replace('/admin/division');
			} else {
				router.replace('/')
			}
		};

		return {
			email,

			emailError,
			password,
			passwordError,
			onSubmit,
			isLoading,
		};
	},
};
</script>
<style lang="scss"></style>
