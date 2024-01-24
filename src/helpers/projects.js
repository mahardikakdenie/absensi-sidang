import { axiosHit } from "@/constant/helpers.js";
const endpoint = "/project";
const endpointShift = '/shift';
export default {
  getData(params, callback, errCB) {
    axiosHit(endpoint, params, "post", callback, errCB);
  },

  getDetailProject(id, params, callback, errCb) {
    const url = `${endpoint}/show/${id}`;
    axiosHit(url, params, "get", callback, errCb);
  },

  createProject(params, callback, errCb) {
    axiosHit(`${endpoint}/store`, params, 'post', callback, errCb);
  },

  updateProject(id,params, callback, errCb) {
    const url = `${endpoint}/update/${id}`;
    axiosHit(url, params, 'put', callback, errCb);
  },

  deleteUserProject(id, callback, errCb) {
    axiosHit(`user-project/${id}`, null, 'delete', callback, errCb);
  },

  insertUserProject(params, callback, errCb) {
    axiosHit(`user-project`, params, 'post', callback, errCb);
  },

  createShift(params, callback, errCb) {
    const url = `${endpointShift}/store`;
    axiosHit(url, params, 'post', callback, errCb);
  },

  updateShift(id,params, callback, errCb) {
    const url = `${endpointShift}/update/${id}`;
    axiosHit(url, params, 'put', callback, errCb);
  },
};
