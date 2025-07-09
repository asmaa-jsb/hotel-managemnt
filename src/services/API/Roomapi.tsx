import { axiosInstance, ROOM_URLS } from "../EndPoints/EndPoints";
import type { IRoomList } from "@/interfaces/RoomInterface";

export const fetchRooms = async (page = 1, size = 10): Promise<IRoomList> => {
  const response = await axiosInstance.get(ROOM_URLS.ROOM_LIST, {
    params: { page, size },
  });
  return response.data;
};


