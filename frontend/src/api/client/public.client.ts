import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = "https://skincancer-detect-api.onrender.com";

const publicClient = axios.create({
  baseURL: API_BASE_URL,
});

publicClient.interceptors.request.use((config: AxiosRequestConfig) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    },
  };
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
