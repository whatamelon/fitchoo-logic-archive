import ax from "./axios";

export const getUserInfoAPI = () => ax.get(`/fc1/auth/info`);

export const setUserHeightAPI = params => ax.put(`/fc1/auth/height/${params}`);

export const changeSizeAPI = params => ax.put(`/fc1/auth/size`, params);
