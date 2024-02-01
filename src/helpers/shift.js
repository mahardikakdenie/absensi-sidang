import { axiosHit } from "@/constant/helpers";

const endpoint = 'shift';

// export const xx = () => {};

export const getDataShifts = (params, callback, errCb) => {
    axiosHit(endpoint, params, 'post', callback, errCb);
}
