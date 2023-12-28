import { defineStore } from "pinia";

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
            from : 1,
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
                }
            ],
        },
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
        setDisableSearch(action) {
            this.isDisabledSearch = action;
        },
        setMeta(meta) {
            this.meta = meta;
        },
        setNameConfig(config) {
            this.nameConfig = config;
        }
    },
};

export const useDataTableStore = defineStore('dataTableStore', wrapper);
