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
        }
    },
};

export const useDataTableStore = defineStore('dataTableStore', wrapper);
