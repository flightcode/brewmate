import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  responseType: "json",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
