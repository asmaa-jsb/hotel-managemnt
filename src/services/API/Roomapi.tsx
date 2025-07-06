import { axiosInstance, ROOM_URLS } from "../EndPoints/EndPoints";
import type { IRoomList } from "@/interfaces/RoomInterface";

export const fetchRooms = async (): Promise<IRoomList> => {
  const response = await axiosInstance.get(ROOM_URLS.ROOM_LIST);
  return response.data;
};


