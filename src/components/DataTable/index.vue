<template>
	<div class="mt-2">
		<Card noborder className="border-none">
			<div
				class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
				<h5>{{ title }}</h5>
				<div class="flex gap-4">
					<vue-button 
						text="Create User"
						btn-class="btn btn-dark px-4 py-2"
						@click="openModalAdd"
					/>
					<InputGroup
						v-model="searchTerm"
						placeholder="Search"
						type="text"
						prependIcon="heroicons-outline:search"
						merged 
					/>
				</div>
			</div>

			<vue-good-table
				:columns="headers"
				styleClass="vgt-table bordered centered"
				:rows="datas"
				:pagination-options="{
					enabled: true,
					perPage: perpage,
				}"
				:search-options="{
					enabled: true,
					externalQuery: searchTerm,
				}"
				:select-options="{
					enabled: true,
					selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
					selectioninfoClass: 'custom-class',
					selectionText: 'rows selected',
					clearSelectionText: 'clear',
					disableSelectinfo: true, // disable the select info-500 panel on top
					selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
				}">
				<template v-slot:table-row="props">
					<column-name v-if="props.column.field === 'name'" :data="props.row" />
					<column-role v-if="props.column.field === 'roles'" :data="props.row" />
					<div v-if="isRowNotModify(props)">
						<span>
							{{  props.row[props.column.field]  }}
						</span>
					</div>
				</template>
				<template #pagination-bottom="props">
					<div class="py-4 px-3">
						<Pagination
							:total="50"
							:current="current"
							:per-page="perpage"
							:pageRange="pageRange"
							@page-changed="current = $event"
							:pageChanged="props.pageChanged"
							:perPageChanged="props.perPageChanged"
							enableSearch
							enableSelect
							:options="options">
							>
						</Pagination>
					</div>
				</template>
			</vue-good-table>
		</Card>
	</div>
</template>
<script>
import Dropdown from '@/components/Dropdown';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import Pagination from '@/components/Pagination';
import { MenuItem } from '@headlessui/vue';
import { advancedTable } from '@/constant/basic-tablle-data';
import VueButton from '@/components/Button';
import columnName from '@/components/DataTable/column/name.vue'
import { useDataTableStore } from '@/store/data-table.js';
import { computed } from 'vue';
import columnRole from '@/components/DataTable/column/roles.vue';
const actions = [
	{
		name: 'view',
		icon: 'heroicons-outline:eye',
	},
	{
		name: 'edit',
		icon: 'heroicons:pencil-square',
	},
	{
		name: 'delete',
		icon: 'heroicons-outline:trash',
	},
];
const options = [
	{
		value: '1',
		label: '1',
	},
	{
		value: '3',
		label: '3',
	},
	{
		value: '5',
		label: '5',
	},
];
const columns = [
	{
		label: 'Id',
		field: 'id',
	},
	{
		label: 'Order',
		field: 'order',
	},
	{
		label: 'Customer',
		field: 'customer',
	},
	{
		label: 'Date',
		field: 'date',
	},

	{
		label: 'Quantity',
		field: 'quantity',
	},

	{
		label: 'Amount',
		field: 'amount',
	},

	{
		label: 'Status',
		field: 'status',
	},
	{
		label: 'Action',
		field: 'action',
	},
];
export default {
	components: {
		Pagination,
		InputGroup,
		Dropdown,
		Icon,
		Card,
		MenuItem,
		VueButton,
		columnName,
		columnRole,
	},

	props: {
		title: {
			type: String,
			default: () => '',
		},
	},

	data() {
		return {
			advancedTable,
			current: 1,
			perpage: 10,
			pageRange: 5,
			searchTerm: '',
			actions,
			options,
			columns,
		};
	},
	methods: {
		openModalAdd() {
			this.$emit('open-modal-add');
		},
	},
	setup() {
		const store = useDataTableStore();
		const headers = computed(() => store.headers);
		const datas = computed(() => store.datas);

		const isRowNotModify = (props) => {
			const forbiddenFields = ['name', 'roles'];
			return !forbiddenFields.includes(props.column.field);
		};

		return {
			headers,
			datas,
			isRowNotModify,
		}
	},
};
</script>
<style lang="scss"></style>
