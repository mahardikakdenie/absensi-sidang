import { defineStore } from "pinia";

const wrapper = {
    state: () => ({
        headers: [],
        datas: [],
    }),
    actions: {
        setHeaders(headers) {
            this.headers = headers;
        },
        setData(datas) {
            this.datas = datas;
        },
    },
};

export const useDataTableStore = defineStore('data-table-store', wrapper);
