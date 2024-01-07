import { axiosHit } from "@/constant/helpers.js";
const endpoint = "/project";
export default {
  getData(params, callback, errCB) {
    axiosHit(endpoint, params, "post", callback, errCB);
  },

  getDetailProject(id, params, callback, errCb) {
    const url = `${endpoint}/${id}`;
    axiosHit(url, params, "get", callback, errCb);
  },

  createProject(params, callback, errCb) {
    axiosHit(`${endpoint}/store`, params, 'post', callback, errCb);
  },

  updateProject(id,params, callback, errCb) {
    const url = `${endpoint}/update/${id}`;
    axiosHit(url, params, 'put', callback, errCb);
  }
};
