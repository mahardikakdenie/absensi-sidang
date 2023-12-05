import { defineStore } from "pinia";

const __wrapper = {
    state: () => ({
        user: {},
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
    },
};

export const useUserStore = defineStore('userstore', __wrapper);
