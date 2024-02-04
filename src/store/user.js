import { defineStore } from "pinia";

const __wrapper = {
    state: () => ({
        user: null || JSON.parse(localStorage.getItem('users')),
        userOptions: [],
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        createUser(user) {
            this.user.push(user);
        },
        setUserOptions(user) {
            this.userOptions = user;
        },
    },
};

export const useUserStore = defineStore('userstore', __wrapper);
