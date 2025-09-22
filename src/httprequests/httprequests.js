import axios from "axios";

const httprequest = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api",
  headers: {
    Accept: "application/json",
  },
});

httprequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httprequest;
