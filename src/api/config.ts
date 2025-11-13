import axios from "axios";

const getApiBaseUrl = () => {
  const eveurl = (import.meta as any).env?.VITE_API_BASE_URL;
  const localUrl = localStorage.getItem("apiBaseUrl");
  if (localUrl) {
    return localUrl;
  }
  if (eveurl) {
    return eveurl;
  }
  return "https://backend-core-v42h.onrender.com";
};

const url = getApiBaseUrl();

// Ensure the API client points to the `/api` prefix on the backend.
// Some backends serve endpoints under https://host/api/..., so append
// `/api` if it's not already present.
// Normalize base and append `/api` only when it's not already present to avoid
// accidental double `/api/api` when the env or local override already contains it.
const baseNoSlash = url.replace(/\/*$/, "");
const apiBase = baseNoSlash.endsWith("/api")
  ? baseNoSlash
  : baseNoSlash + "/api";

export const apiBaseUrl = apiBase;

const api = axios.create({
  baseURL: apiBase,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.code === "ERR_CANCELED") {
        return Promise.reject(error);
      }
      // Dispatch a global event so the app can handle session expiry centrally
      try {
        window.dispatchEvent(
          new CustomEvent("auth:expired", { detail: { status: 401 } })
        );
      } catch (e) {
        // Fallback to direct redirect if CustomEvent dispatching fails
        try {
          window.location.href = "/login";
        } catch (e) {
          // ignore
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
