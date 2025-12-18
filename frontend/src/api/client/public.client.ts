import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "https://skincancer-detect-api.onrender.com";

const publicClient = axios.create({
  baseURL: API_BASE_URL,
});

publicClient.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = new axios.AxiosHeaders();
  }

  config.headers.set("Content-Type", "multipart/form-data");

  return config;
});

publicClient.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => {
    return response.data;
  },
  (error) => {
    throw error.response?.data || error;
  }
);

export default publicClient;
