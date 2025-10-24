import axios from "axios";

const api = axios.create({
  baseURL: "https://seu-backend.com/api", // Mudar para a URL real da API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
