import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5000/api",
  responseType: "json",
  headers: {
    "x-access-token": `${localStorage.getItem("token")}`,
  },
});

export { api };
