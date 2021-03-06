import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:4000/
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

console.log(process.env.NEXT_PUBLIC_API_URL);

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
