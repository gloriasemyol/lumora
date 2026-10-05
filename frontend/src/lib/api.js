import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL: `${API_URL}/api` });

// Attach the wristband (token) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lumora_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the wristband expired, send the admin back to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLogin = err.config?.url?.includes("/auth/login");
    if (err.response?.status === 401 && localStorage.getItem("lumora_token") && !isLogin) {
      localStorage.removeItem("lumora_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

// Turns "/uploads/abc.png" into "http://localhost:5000/uploads/abc.png"
export const assetUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_URL}${path}`;
};

export default api;