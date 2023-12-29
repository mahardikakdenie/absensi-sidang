<template>
    <div>
        <vue-button
            v-for="(action, index) in actions"
            :key="index"
            :icon="action.icon"
            :icon-tooltip="action.tooltipText"
            :btn-class="action.btnClass"
            @click="handleClick(action)"
        />
    </div>
</template>

<script setup>
import VueButton from '@/components/Button';
import { useDataTableStore } from '@/store/data-table';
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        default: null,
    }
})

// Using the data-table store
const store = useDataTableStore();

// Getting the actions from the store as a computed property
const actions = computed(() => store.actions);

/**
 * Handles the button click event and triggers an action based on the provided action key.
 *
 * @param {Object} action - The action associated with the clicked button.
 * @param {string} action.key - The key identifying the action.
 * @param {*} [props.data] - Additional data associated with the action.
 * @returns {void}
 */
 const handleClick = (action) => {
    const params = {
        key: action?.key,
        data: props?.data,
    };
    store?.trigerAction(params);
};

</script>
