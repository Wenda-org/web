import axios from "axios";

const getMlApiBaseUrl = () => {
  const eveurl = (import.meta as any)?.env?.VITE_ML_API_BASE_URL;
  const localUrl = localStorage.getItem("mlApiBaseUrl");
  if (localUrl) {
    return localUrl;
  }
  if (eveurl) {
    return eveurl;
  }
  // default placeholder ML backend
  return "https://backend-ml-c75p.onrender.com";
};

const url = getMlApiBaseUrl();

export const mlApiBaseUrl = url;

const mlApi = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token when available (optional for ML backend)
mlApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default mlApi;
