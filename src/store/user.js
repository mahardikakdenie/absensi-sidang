import { defineStore } from "pinia";

const __wrapper = {
    state: () => ({
        user: [] || JSON.parse(localStorage.getItem('users')),
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        createUser(user) {
            this.user.push(user);
        },
    },
};

export const useUserStore = defineStore('userstore', __wrapper);
