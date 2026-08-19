import axios from "axios";

const api = axios.create({
  baseURL: "https://shopez-backend-coral.vercel.app/api",
});

export default api;
