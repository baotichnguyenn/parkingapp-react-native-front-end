import AxiosClient, { AxiosClientFormData } from "@/utils/Axios.util";

interface OwnerData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
}

interface LoginOwnerAuthData {
  email: string;
  password: string;
}

export const createNewOwner = async (ownerData: OwnerData) => {
  return await AxiosClient.post("owner/register", ownerData);
};

export const loginOwnerAuth = async (
  loginOwnerAuthData: LoginOwnerAuthData
) => {
  return await AxiosClient.post("owner/login", loginOwnerAuthData);
};

export const createOwnerParking = async (formData: FormData) => {
  try {
    return await AxiosClientFormData.post("owner/register-parking", formData);
  } catch (error) {
    console.log("createOwnerParking error:", error);
    throw error;
  }
};
