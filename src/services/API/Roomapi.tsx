import { axiosInstance, BOOKINGS, ROOM_URLS } from "../EndPoints/EndPoints";
import type { IRoomList } from "@/interfaces/Interfaces";

export const fetchRooms = async (page = 1, size = 10): Promise<IRoomList> => {
  const response = await axiosInstance.get(ROOM_URLS.ROOM_LIST, {
    params: { page, size },
  });
  return response.data;
};

 export const fetchBookings = async() =>{
  const response = await axiosInstance.get(BOOKINGS.GET_ALL_BOOKINGS, {

  });

  return response.data;

 }
// export const fetchFacilities = async (): Promise<IRoomList> => {
//   const response = await axiosInstance.get(ROOM_URLS.ROOM_LIST, {});
//   return response.data;
// };

