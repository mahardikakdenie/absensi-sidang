import { axiosHit } from "@/constant/helpers";

const endpoint = 'shift';

export const getDataShift = (params, callback, errCb) => {
    axiosHit(endpoint, params, 'post', callback, errCb);
}
