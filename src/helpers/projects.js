import { axiosHit } from "@/constant/helpers.js";
const endpoint = "/project";
export default {
  getData(params, callback, errCB) {
    axiosHit(endpoint, params, "get", callback, errCB);
  },

  getDetailProject(id, params, callback, errCb) {
    const url = `${endpoint}/${id}`;
    axiosHit(url, params, "get", callback, errCB);
  },
};
