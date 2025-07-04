import axios from "axios";
import CookieServices from "../CookieServices/CookieServices";
const baseURL = "https://upskilling-egypt.com:3000";
export const portalUrl = "api/v0/portal/users";
export const imgURL = "https://upskilling-egypt.com:3003";

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = CookieServices.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ****************** USERS Portal Auth **********************

export const USERS_URLS = {
  LOGIN: `${portalUrl}/login`,
  FORGET_PASSWORD: `${portalUrl}/forgot-password`,
  RESET_PASSWORD: `${portalUrl}/reset-password`,
  REGISTER: `${portalUrl}`,
  CHANGE_PASSWORD: `${portalUrl}/change-password`,
  GET_USER_PROFILE: (id: string) => `${portalUrl}/${id}`,
  facebook_auth: `${portalUrl}/auth/facebook`,
  google_auth: `${portalUrl}/auth/google`,
};
