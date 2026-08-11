import React, { createContext, ReactNode, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/constants/Config";
import { AsyncStorageService } from "./AsyncStorageService";

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const APIContext = createContext(apiInstance);

type AxiosNetworkProviderProps = {
  children: ReactNode;
};

export const AxiosNetworkProvider: React.FC<AxiosNetworkProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    apiInstance.interceptors.request.use(
      async (config) => {
        const storage = new AsyncStorageService();
        const latestToken = (await storage.getToken()) || null;

        if (latestToken) {
          config.headers.Authorization = `Bearer ${latestToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <APIContext.Provider value={apiInstance}>{children}</APIContext.Provider>
  );
};
