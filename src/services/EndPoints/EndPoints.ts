import axios from "axios";
import CookieServices from "../CookieServices/CookieServices";
const baseURL = "https://upskilling-egypt.com:3000";
export const UserPortal = "api/v0/portal/users";
export const BasePortal = "api/v0/portal";
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
  facebook_auth: `${UserPortal}/auth/facebook`,
  google_auth: `${UserPortal}/auth/google`,
};
// ****************** Admin Portal **********************
// rooms
export const ROOM_URLS = {
  ROOM_LIST: `${AdminPortal}/rooms`,
  DELETE_ROOM: (id: string) => `${AdminPortal}/rooms/${id}`,
  UPDATE_ROOM: (id: string) => `${AdminPortal}/rooms/${id}`,
  CREATE_ROOM: `${AdminPortal}/rooms`,
  GET_FACILITIES: `${AdminPortal}/room-facilities`,
  GET_ROOM_DETAILS: (id: string) => `/api/v0/admin/rooms/${id}`,
};
// FACILITIES
export const FACILITIES_URLS = {
  GET_ALL_FACILITIES: `${AdminPortal}/room-facilities`,
  CREATE_FACILITIES: `${AdminPortal}/room-facilities`,
  DELETE_FACILITIES: (id: string) => `${AdminPortal}/room-facilities/${id}`,
  UPDATE_FACILITIES: (id: string) => `${AdminPortal}/room-facilities/${id}`,
};
// booking list
export const BOOKINGS = {
  GET_ALL_BOOKINGS: `${AdminPortal}/booking`,
  GET_BOOKING_BY_ID: (id: string) => `${AdminPortal}/booking/${id}`,
  DELETE_BOOKING_BY_ID: (id: string) => `${AdminPortal}/booking/${id}`,
  CREATE_BOOKING: `${BasePortal}/booking`
};
// users list
export const USERS = {
  GET_ALL_USERS: `${AdminPortal}/users`,
  GET_USER_PROFILE: (id: string) => `${AdminPortal}/users/${id}`,
};

export const ADS_URLS = {
  ADS_LIST: `${AdminPortal}/ads`,
  ADS_Edit: (id: string) => `${AdminPortal}/ads/${id}`,
};
//Chart
export const CHART = {
  GET_CHART: `${AdminPortal}/dashboard`,
};
/**********user portal************ */
/**************Users Rooms******************* */
export const USER_ROOMS_URLS ={
  GET_ALL_USERS_ADS:`${BasePortal}rooms/available`,
  GET_ROOM_BY_ID:(id: string)=>`${BasePortal}/rooms/${id}`

}
/**************Users ADS******************* */

export const USER_ADS_URLS ={
  GET_ALL_USERS_ADS:`${BasePortal}/ads`,
  GET_AD_BY_ID:(id: string)=>`${BasePortal}/ads/${id}`


}

//************* User Explore **************** */
export const USER_Explore_URLS = {
  GET_ALL_ROOMS: (page = 1, size = 10, startDate: string, endDate: string) =>
    `${BasePortal}/rooms/available?page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`,
};
/*******************reviews******************* */
export const REVIEWS_URLS ={
  CREATE_REVIEW : `${BasePortal}/room-reviews`,
  GET_ALL_REVIEWS:(id:string)=>`${BasePortal}/room-reviews/${id}`,

}
/*******************comments************************** */
export const COMMENTS_URLS ={
  CREATE_COMMENT: `${BasePortal}/room-comments`,
  GET_ALL_COMMENTS:(id:string)=>`${BasePortal}/room-comments/${id}`,
 DELETE_COMMENT:(id:string)=>`${BasePortal}/room-comments/${id}`,
  UPDATE_COMMENT:(id:string)=>`${BasePortal}/room-comments/${id}`,

  
}
