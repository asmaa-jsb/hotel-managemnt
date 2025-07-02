import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3000";
export const portalUrl = "api/v0/portal/users";
// export const imgURL = "https://upskilling-egypt.com:3003";

export const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
  LOGIN: `/users/login`,
  FORGET_PASSWORD: `/users/forgot-password`,
  RESET_PASSWORD: `/users/reset-password`,
  REGISTER: `/users`,
  CHANGE_PASSWORD: `/users/change-password`,
  GET_USER_PROFILE: (id: string) => `/users/${id}`,
  facebook_auth: `/users/auth/facebook`,
  google_auth: `/users/auth/google`,
};
