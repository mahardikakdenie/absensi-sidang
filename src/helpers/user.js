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
        axiosHit(endpointUser, params, 'get', cb, errCB);
    },
    createUser(params, cb, errCB) {
        axiosHit(endpointUser, params, 'post', cb, errCB);
    },
}
