import client from "./http-client";
const endpoint = 'attendance';

export const getDataAttendanceLogs = (params, callback, errCallback) => {
    const url = `${endpoint}/log`;
    client.get(url, { params })
        .then(res => {
            if (callback) callback(res);
        })
        .catch(e => {
            if (errCallback) errCallback(e)
        })
};

export const attendance = (params, callback, errCallback) => {
    client.post(endpoint, params)
        .then(res => {
            if (callback) callback(res);
        })
        .catch(e => {
            if (errCallback) errCallback(e)
        })
};
