import type { AdsLanding } from "@/interfaces/AdsLandingInterface";
import { axiosInstance, USER_ADS_URLS, USER_ROOMS_URLS } from "../EndPoints/EndPoints";
import type { Room } from "@/interfaces/RoomInterface";

export const getRoomDetails = async (id: string): Promise<AdsLanding> => {
  const response = await axiosInstance.get(USER_ROOMS_URLS.GET_ROOM_BY_ID(String(id)));
  return response.data;
};
export const getAdDetails = async (id: string): Promise<Room> => {
  const response = await axiosInstance.get(USER_ADS_URLS.GET_AD_BY_ID(String(id)));
  return response.data;
};
