import axios from "axios";

const api = axios.create({
  baseURL: "https://backendgrantacademy.ferpuwi.com/api",
  // ❌ JANGAN hardcode Content-Type karena akan menimpa FormData header
  // ✅ Let axios auto-detect based on request body (FormData = multipart/form-data, Object = application/json)
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
