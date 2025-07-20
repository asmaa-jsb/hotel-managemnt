import type { RoomExploreList } from "@/interfaces/ExploreRoomsInterface";
import { axiosInstance, USER_Explore_URLS } from "../EndPoints/EndPoints";




export const fetchAvailableRooms = async (
  page: number,
  size: number,
  startDate: string,
  endDate: string,
  capacity: number
): Promise<RoomExploreList> => {
  const url = USER_Explore_URLS.GET_AVAILABLE_ROOMS(
    page,
    size,
    startDate,
    endDate,
    capacity
  );
  const response = await axiosInstance.get(url);
  return response.data; 
};