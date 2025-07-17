import type { RoomExploreList } from "@/interfaces/ExploreRoomsInterface";
import { axiosInstance, USER_Explore_URLS } from "../EndPoints/EndPoints";




export const fetchAvailableRooms = async (
  page = 1,
  size = 10,
  startDate: string,
  endDate: string
) : Promise<RoomExploreList> =>    
{
    const response = await axiosInstance.get(USER_Explore_URLS.GET_ALL_ROOMS(page , size , startDate , endDate));
    return response.data.data;

}