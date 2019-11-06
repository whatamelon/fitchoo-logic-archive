import axios from "axios";

const ax = axios.create({
  baseURL: "https://rest.fitchoo.kr"
});

ax.defaults.timeout = 12000;

ax.interceptors.request.use(
  request => {
    request.headers.Authorization = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    return request;
  },
  error => Promise.reject(error)
);

ax.interceptors.response.use(
  response => {
    const accessToken = response.headers.authorization;
    if (accessToken) {
      localStorage.accessToken = accessToken;
    }
    response.data.accessToken = accessToken !== null ? accessToken : null;
    return response.data;
  },
  error => Promise.reject(error)
);

export default ax;
