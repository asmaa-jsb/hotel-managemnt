import axios from "axios";
import CookieServices from "../CookieServices/CookieServices";
const baseURL = "https://upskilling-egypt.com:3000";
export const UserPortal = "api/v0/portal/users";
export const AdminPortal = "/api/v0/admin";
export const imgURL = "https://upskilling-egypt.com:3003";
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = CookieServices.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ****************** USERS Portal Auth **********************

export const USERS_URLS = {
  LOGIN: `${UserPortal}/login`,
  FORGET_PASSWORD: `${UserPortal}/forgot-password`,
  RESET_PASSWORD: `${UserPortal}/reset-password`,
  REGISTER: `${UserPortal}`,
  CHANGE_PASSWORD: `${UserPortal}/change-password`,
  GET_USER_PROFILE: (id: string) => `${UserPortal}/${id}`,
  facebook_auth: `${UserPortal}/auth/facebook`,
  google_auth: `${UserPortal}/auth/google`,
};
// ****************** Admin Portal **********************
// rooms
export const ROOM_URLS = {
  ROOM_LIST: `${AdminPortal}/rooms`,
  
};

export const FACILITIES_URLS ={
  GET_ALL_FACILITIES :`${AdminPortal}/room-facilities`,
  CREATE_FACILITIES : `${AdminPortal}/room-facilities`,
  DELETE_FACILITIES :(id : string)=> `${AdminPortal}/room-facilities/${id}`,
  UPDATE_FACILITIES :(id :string) => `${AdminPortal}/room-facilities/${id}`,
 
}
// booking list
export const BOOKINGS = {
 GET_ALL_BOOKINGS: `${AdminPortal}/booking`,
 GET_BOOKING_BY_ID: (id: string) => `${AdminPortal}/booking/${id}`,
 DELETE_BOOKING_BY_ID:(id: string)=> `${AdminPortal}/booking/${id}`,
}
