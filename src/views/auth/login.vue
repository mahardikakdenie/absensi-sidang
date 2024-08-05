<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[500px]">
            <div v-if="alert" class="border rounded-md bg-red-400 p-2 flex justify-between">
                <div>
                    <span class="text-white font-bold">{{ alert }}</span>
                </div>
                <div class="flex items-center cursor-pointer" @click="alert = ''">
                    <vue-icon icon="ic:baseline-close" class="text-[20px] text-white" />
                </div>
            </div>
            <div class="p-5 flex justify-center">
                <img src="/logo/orderonline.svg" width="200" alt="" />
            </div>
            <form>
                <div class="mb-4">
                    <label for="email"
                        class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email:</label>
                    <input v-model="email" type="email" id="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email" />
                </div>
                <div class="mb-6">
                    <label for="password"
                        class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password:</label>
                    <input v-model="password" type="password" id="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password" />
                </div>
                <div class="flex items-center justify-between">
                    <vue-button text="SIgn In" btn-class="btn btn-dark block w-full text-center" :is-loading="isLoading"
                        :is-Disabled="isLoading" @click.prevent="onSubmit" />
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// import reCaptcha from '@/components/reCaptcha.vue';
import Textinput from '@/components/Textinput';
import VueButton from '@/components/Button/index.vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import authApi from '@/helpers/auth.js';
import client from '@/helpers/http-client';
import { ref, computed } from 'vue';
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';
import VueIcon from '@/components/Icon/index.vue';
import axios from 'axios';

export default {
    components: {
        VueButton,
        Textinput,
        VueReCaptcha,
        VueIcon,
        // reCaptcha
    },
    data() {
        return {
            checkbox: false,
            alert: '',
        };
    },
    setup() {
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
        const token = ref(null);

        // Membuat computed property untuk fungsi recaptcha
        const recaptcha = computed(async () => {
            // (optional) Tunggu hingga recaptcha telah dimuat.
            await recaptchaLoaded();

            // Eksekusi reCAPTCHA dengan aksi "login".
            const generatedToken = await executeRecaptcha('LOGIN');

            // Lakukan sesuatu dengan token yang diterima.
            // Di sini, token dapat diakses melalui recaptcha.value.
            token.value = generatedToken;

            return generatedToken;
        });
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
        const { value: password, errorMessage: passwordError } =
            useField('password');


        const onSubmit = handleSubmit(async (values) => {

            await recaptchaLoaded();

            // Eksekusi reCAPTCHA dengan aksi "login".
            const generatedToken = await executeRecaptcha('LOGIN');
            isLoading.value = true;
            const email = values.email;
            const password = values.password;
            const resonsesrecaptcha = generatedToken;

            const params = {
                email,
                password,
                'g-recaptcha-response': resonsesrecaptcha,
            };

            const url = import.meta.env.VITE_AUTH_API_URL;
            axios.post(`${url}/auth/login`, params).then((res) => {
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
                    const isAdminMode = responseUser?.roles?.some(curr => curr?.roleId === "1" || curr?.roleId === "3");
                    if (isAdminMode) {
                        router?.push('/admin/division');
                    } else {
                        router?.push('/');
                    }
                } else {
                    isLoading.value = false;
                    toast.error(data.meta.message, {
                        timeout: 2000,
                    });
                }
            }).catch(e => {
                isLoading.value = false;
                console.log(e);
            });
        });

        const checkCapabilities = (user) => {
            const isAdminMode = ['superadmin', 'admin'];

            const checkCapabilities = user?.roles?.some((role) =>
                isAdminMode.includes(role?.role?.name)
            );
            checkUserIsNewAccount(user);

            if (checkCapabilities) {
                router.replace('/admin/division');
            } else {
                router.replace('/');
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
            recaptcha,
        };
    },
};
</script>
<style scoped></style>
