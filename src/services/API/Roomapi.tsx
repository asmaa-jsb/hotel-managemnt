import { axiosInstance, ROOM_URLS } from "../EndPoints/EndPoints";
import type { IRoomList } from "@/interfaces/RoomInterface";

export const fetchRooms = async (page = 1, size = 10): Promise<IRoomList> => {
  const response = await axiosInstance.get(ROOM_URLS.ROOM_LIST, {
    params: { page, size },
  });
  console.log("first response", response);
  return response.data;
};

export const fetchFacilities = async (): Promise<IRoomList> => {
  const response = await axiosInstance.get(ROOM_URLS.ROOM_FACILITIES, {});
  console.log("✅ Facilities Response:", response.data);
  return response.data;
};
