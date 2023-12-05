import client from "./http-client";
const endpoint = '/project';
export default {
    getData(params, callback, errCB) {
        client.get(endpoint, { params })
            .then(res => {
                if (callback) callback(res);
            }).catch(e => {
                if (errCB) errCB(e);
            })
    },
};
