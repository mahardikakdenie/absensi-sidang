import window from '@/mixins/window';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

const wrapper = {
	state: () => ({
		isDisabledSearch: false,
		headers: [],
		datas: [],
		actions: [
			{
				icon: 'bi:pencil',
				tooltipText: 'Edit',
				btnClass: 'btn btn-sm text-primary-400',
			},
			{
				icon: 'material-symbols:delete',
				tooltipText: 'Delete',
				btnClass: 'btn btn-sm text-red-400',
			},
		],
		meta: {
			current_page: 1,
			from: 1,
			last_page: 1,
			per_page: 10,
			to: 1,
			total: 1,
		},
		nameConfig: {
			icons: [
				{
					icon: 'mdi:email-send',
					tooltipText: 'Send Email to activate this account',
					btnClass: 'btn-sm btn hover:text-success-600',
				},
			],
		},
		typeAction: null,
	}),
	actions: {
		setHeaders(headers) {
			this.headers = headers;
		},
		setData(datas) {
			this.datas = datas;
		},
		setActions(actions) {
			this.actions = actions;
		},
		insertData(data) {
			this.datas.push(data);
		},
		updateData(data, id, type) {
			const index = this.datas.findIndex((curr) => curr.id === id);

			if (type === 'form') {
				if (index !== -1) {
					Object.assign(
						this.datas[index],
						Object.fromEntries(
							data.map((item) => [item.key, item.value])
						)
					);
				}
			} else {
                this.datas[index].status = data?.status;
                console.log("🚀 ~ file: data-table.js:66 ~ updateData ~ data?.status:", data)
            }
		},
		setDisableSearch(action) {
			this.isDisabledSearch = action;
		},
		setMeta(meta) {
			this.meta = meta;
		},
		setNameConfig(config) {
			this.nameConfig = config;
		},
		trigerAction(action) {
			this.typeAction = action;
		},
		navigateToAbout() {
		},
	},
};

export const useDataTableStore = defineStore('dataTableStore', wrapper);
