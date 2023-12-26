<template>
<modal 
    :active-modal="activeModal" 
    sizeClass="max-w-2xl"
    @close="$emit('close')"
>
    <div class="grid grid-cols-1">
        <div 
            v-for="(field, index) in forms"
            :key="index" 
            class="mt-2"
        >
            <text-input-field
                v-if="field?.type === 'text'"
                v-model="forms[index].value"
                :error="field.error"
                :type="field.type"
                :label="field.label"
                :placeholder="field.placeholder"
                @input="onInput($event, field)"
            />
            <text-input-field
                v-if="field?.type === 'password'"
                v-model="forms[index].value"
                :type="field.type"
                :error="field.error"
                :label="field.label"
                :placeholder="field.placeholder"
                @input="onInput($event, field)"
            />
            <vue-select 
                v-if="field?.type === 'multiselect'" 
                v-model="forms[index].value"
                :option="field.options"
                :type="field.type"
                :error="field.error"
                :label="field.label"
                :placeholder="field.placeholder"
                @input="onInput($event, field)"
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
                :is-disabled="!noErrors"
                btn-class="btn btn-primary light btn-sm"
                @click="submit" 
            />
        </div>
    </div>
</modal>
</template>

<script setup>
import VueButton from '@/components/Button';
import VueSelect from "@/components/Select/VueSelect";
import TextInputField from '@/components/Textinput/index.vue';
import Modal from '@/components/Modal/index.vue';
import { computed, ref, watchEffect } from 'vue';
import { duplicateVar } from '@/constant/helpers';

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
    forms.value = duplicateVar(props?.fields);
    forms.value = forms?.value?.map(form => {
        return {
            ...form,
            error: '',
        }
    })
}

watchEffect(() => {
    init();
});

const setError = (field) => {
    const index = forms?.value?.findIndex(form => form?.key === field?.key);
    forms.value[index].error = field?.value === '' ? 'Inputan Tidak boleh Kosong' : undefined;
    setErrorPassword(field, index);
};

const setErrorPassword = (field, index) => {
    if (field?.type === 'password' || field?.type === 'confirm_password') {
        const passwordField = forms?.value?.find(form => form?.key === 'password');
        const confirmPasswordField = forms?.value?.find(form => form?.key === 'confirm_password');

        const passwordMatchError = confirmPasswordField && passwordField && passwordField?.value !== confirmPasswordField?.value;

        forms.value[index].error = passwordMatchError ? 'Kata sandi tidak cocok' : forms?.value?.[index]?.error;
    }
};

const onInput = (event, field) => {
    setError(field);
};

const noErrors = computed(() => forms?.value?.every(curr => curr?.error === '' || curr?.error === undefined) ?? false);
const emit = defineEmits(['submit']);
const submit = () => {
    forms?.value?.forEach(curr => setError(curr));
    
    // Check if there are any errors in the forms
    const noErrors = forms?.value?.every(curr => curr?.error === '' || curr?.error === undefined);

    // Only emit 'submit' if there are no errors
    if (noErrors) {
        emit('submit', forms.value);
    }
};



</script>

<style>

</style>
