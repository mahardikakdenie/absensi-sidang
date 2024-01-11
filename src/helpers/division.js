import { axiosHit } from "@/constant/helpers.js";
import client from "./http-client.js";
const endpoint = '/devision';

export default {
    /**
     * Fetches data from an endpoint using the HTTP GET method.
     *
     * @param {Object} params - Parameters to be sent along with the request.
     * @param {Function} callback - Function to be called if the request is successful, with the response data as an argument.
     * @param {Function} errCB - Function to be called if the request results in an error, with the error object as an argument.
     */
    getData(params, callback, errCB) {
        client.post(endpoint, params)
            .then(res => {
                if (callback) callback(res);
            }).catch(e => {
                if (errCB) errCB(e);
            });
    },
    createDivision(params, callback, errCb) {
        const url = `${endpoint}/store`;
        axiosHit(url, params, 'post', callback, errCb);
    },
    updateDivision(id,params, callback, errCb) {
        const url = `${endpoint}/update/${id}`;
        axiosHit(url, params, 'put', callback, errCb);
    },

    deleteUserProject(id, callback, errCb) {
        axiosHit(`user-division/${id}`, null, 'delete', callback, errCb);
    },
    
    insertUserProject(params, callback, errCb) {
        axiosHit(`user-division`, params, 'post', callback, errCb);
    },
}
