import client from "./http-client";
import { axiosHit } from '@/constant/helpers.js'

const endpoint = 'profile';
const endpointUser = 'user';

export default {
    getMe(params,cb, errCB) {
        const url = `${endpoint}/me`;
        client.get(url, { params })
            .then(res => {
                cb(res);
            }).catch(e => {
                errCB(e);
            })
    },
    getAllUsers(params,cb, errCB) {
        const url = `${endpointUser}/all`
        axiosHit(url, params, 'post', cb, errCB);
    },
    createUser(params, cb, errCB) {
        axiosHit(endpointUser, params, 'post', cb, errCB);
    },
    getUserSummary(params, cb, errCb) {
        const url = `${endpointUser}/summary`;
        axiosHit(url, params, 'get', cb, errCb);
    },

    getUserSelected(params, cb, errCb) {
        const url = `${endpointUser}/selected`;
        axiosHit(url, params, 'post', cb, errCb);
    }
}
