import axios from "axios";
import authHeader from "./authHeader";

let urls = {
  test: "http://localhost:4000/",
  development: "http://localhost:4000/",
  production: "http://localhost:4000/",
};

export const client = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

client.interceptors.request.use(
  config => {
    let user: any;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
      config.headers["Authorization"] = `Bearer ${user && user.token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
