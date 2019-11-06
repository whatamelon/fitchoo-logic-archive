import ax from "./axios";

export const signInAPI = params => ax.post(`/fc1/auth/signin`, params);

export const signOutAPI = () => ax.get(`/fc1/auth/signout`);

export const signUpAPI = params => ax.post(`/fc1/auth/signup`, params);

export const changePasswordAPI = params => ax.put(`/fc1/auth/passwd`, params);
