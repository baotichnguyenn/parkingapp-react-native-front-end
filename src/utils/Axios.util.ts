import { API_URL } from "@/constants/Config";
import axios from "axios";

const AxiosClient = axios.create({
  baseURL: process.env.API_URL || API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const AxiosClientFormData = axios.create({
  baseURL: process.env.API_URL || API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

AxiosClientFormData.interceptors.request.use(async (config) => {
  console.log("📤 Request made with config:", {
    url: config.url,
    method: config.method,

    data: config.data,
  });

  return config;
});

// Response Interceptor
AxiosClientFormData.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.request.use(async (config) => {
  console.log("Request made with ", config);

  return config;
});
AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default AxiosClient;
export { AxiosClientFormData };
