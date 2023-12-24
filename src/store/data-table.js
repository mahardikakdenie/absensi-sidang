import { defineStore } from "pinia";

const wrapper = {
    state: () => ({
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
        }
    },
};

export const useDataTableStore = defineStore('data-table-store', wrapper);
