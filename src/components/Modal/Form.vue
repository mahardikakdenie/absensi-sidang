<template>
<modal 
    :active-modal="activeModal" 
    sizeClass="max-w-2xl"
    @close="$emit('close')"
>
    <form @submit.prevent="submit" class="grid grid-cols-1">
        <div 
            v-for="(field, index) in forms"
            :key="index" 
            class="mt-2"
        >
            <text-input-field
                v-if="field?.type === 'text'"
                :v-model="email"
                :error="field.error"
                :type="field.type"
                :label="field.label"
                :placeholder="field.placeholder"
                @change="onChangeForm($event,field, index)"
            />
            <text-input-field
                v-if="field?.type === 'password'"
                :v-model="field.value"
                :type="field.type"
                :label="field.label"
                :placeholder="field.placeholder"
                @change="onChangeForm($event,field, index)"
            />
        </div>
        <div class="flex justify-end mt-4 gap-2">
            <vue-button 
                text="Cancel" 
                btn-class="btn btn-danger light btn-sm" 
                @click="$emit('close')" 
            />
            <vue-button 
                text="Add User"
                btn-class="btn btn-primary light btn-sm"
                :disabled="isBtnDisabled"
                @click="submit" 
            />
        </div>
    </form>
</modal>
</template>

<script setup>
import VueButton from '@/components/Button';
import TextInputField from '@/components/Textinput/index.vue';
import Modal from '@/components/Modal/index.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { duplicateVar } from '@/constant/helpers';
import { useField, useForm } from "vee-validate";

import * as yup from "yup";

const props = defineProps({
    activeModal: {
        type: Boolean,
        default: false,
    },
    fields: {
        type: Array,
        default: () => ([
            {
                type: 'text',
                key: 'name',
                label: 'Nama',
                placeholder: 'Masukan Nama'
            }
        ])
    }
});

const forms = ref([]);
const form = ref({
    name: '',
});

const init = () => {
    forms.value = duplicateVar(props.fields);
    forms.value = forms.value.map(form => {
        return {
            ...form,
            error: '',
        }
    })
}

watchEffect(() => {
    init();
});


const emit = defineEmits(['submit']);

const onChangeForm = (event, field, index) => {
    form.value[field.key] = event.target.value;
    forms.value[index].value = event.target.value;
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email) ? 'Masukan Email Dengan Benar' : '';
}

const { value: email, errorMessage: emailError } = useField("email");
const { value: username, errorMessage: usernameError } = useField("username");
const schema = yup.object({
        email: yup.string().required().email(),
        username: yup.string().required(),
    });

    const { handleSubmit } = useForm({
        validationSchema: schema,
    });


const isBtnDisabled = ref(false);
const submit = () => {
    console.log('email => ', email);
};


</script>

<style>

</style>
