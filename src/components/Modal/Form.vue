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
                :v-model="field.value"
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
    const value = event.target.value
    console.log("🚀 ~ file: Form.vue:99 ~ onChangeForm ~ value:", value)
    forms.value[index].value = value;
    console.log("🚀 ~ file: Form.vue:101 ~ onChangeForm ~ forms.value[index].value:", forms.value[index].value)

};
const submit = () => {
    emit('submit', forms.value)
};


</script>

<style>

</style>
