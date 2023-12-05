import client from "./http-client";

const endpoint = 'profile';

export default {
    getMe(params,cb, errCB ) {
        client.get(endpoint, { params })
            .then(res => {
                cb(res);
            }).catch(e => {
                errCB(e);
            })
    },
}
