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
			password: yup.string().required('Password is required'),
		});

		const toast = useToast();
		const router = useRouter();

		const formValues = {
			email: '',
			password: '',
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
					const responseUser = data?.data?.access_token?.user;
					localStorage.setItem('users', JSON.stringify(responseUser));
					checkCapabilities(responseUser);
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
			checkUserIsNewAccount(user);
			
			if (checkCapabilities) {
				router.replace('/admin/division');
			} else {
				router.replace('/')
			}
		};

		const checkUserIsNewAccount = (user) => {
			if (!user.profile) {
				router.push('/on-boarding');
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
