import AxiosClient from "@/utils/Axios.util";

interface UserData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
}

interface OwnerData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
}

interface LoginAuthData {
  email: string;
  password: string;
}
interface LoginOwnerAuthData {
  email: string;
  password: string;
}
interface emailotpData {
  email: string;
}

interface emailotpVerifyData {
  email: string;
  otp: string;
}
export const createNewUser = async (userData: UserData) => {
  return await AxiosClient.post("register", userData);
};

export const createNewOwner = async (ownerData: OwnerData) => {
  return await AxiosClient.post("owner/register", ownerData);
};

export const loginUserAuth = async (loginAuthData: LoginAuthData) => {
  return await AxiosClient.post("login", loginAuthData);
};

export const loginOwnerAuth = async (
  loginOwnerAuthData: LoginOwnerAuthData
) => {
  return await AxiosClient.post("owner/login", loginOwnerAuthData);
};

export const SendEmailOtp = async (emailOtpData: emailotpData) => {
  return await AxiosClient.post("email-verify/send-otp", emailOtpData);
};

export const VerifyEmailOtp = async (
  emailOtpVerifyData: emailotpVerifyData
) => {
  return await AxiosClient.post("email-verify/verify-otp", emailOtpVerifyData);
};

export const getBookingHistory = async (userId: string, page?: number) => {
  return await AxiosClient.post(`bookings/get-all-bookings`, { userId, page });
};

export const getLetestData = async (userId: string) => {
  return await AxiosClient.post(`/get-latest-data`, { userId });
};

export const ChangePassword = async (userId: string, newPassword: string) => {
  return await AxiosClient.post(`password/change-password`, {
    userId,
    newPassword,
  });
};
