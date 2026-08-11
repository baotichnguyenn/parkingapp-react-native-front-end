import { useContext } from "react";
import { APIContext } from "@/services/ApiContext";

export const useApi = () => {
  return useContext(APIContext);
};
