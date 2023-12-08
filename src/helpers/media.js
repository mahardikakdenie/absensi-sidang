import client from "./http-client";
const url = 'media';

export const uploadMedia = (params, callback, errCallback) => {
    client.post(url, params).then(res => {
        if (callback) callback(res);
    }).catch(e => {
        if (errCallback) errCallback(e);
    });
};
