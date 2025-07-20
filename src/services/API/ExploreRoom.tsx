import type { FetchAvailableRoomsParams } from "@/interfaces/ExploreRoomsInterface";
import { axiosInstance, USER_Explore_URLS, USER_FILTER_Explore } from "../EndPoints/EndPoints";

export const fetchAvailableRooms = async ({
  page = 1,
  size = 5,
  startDate,
  endDate,
  guests,
}: FetchAvailableRoomsParams) => {
  try {
    let res;

    if (startDate && endDate) {
      
      res = await axiosInstance.get(
        USER_FILTER_Explore.GET_AVAILABLE_ROOMS(page, size, startDate, endDate)
      );
    } else {
     
      res = await axiosInstance.get(
        USER_Explore_URLS.GET_AVAILABLE_ROOMS(page, size)
      );
    }

    let rooms = res.data.data.rooms;

    // فلترة حسب عدد الأشخاص لو موجود
    if (guests) {
      rooms = rooms.filter(room => room.capacity >= guests);
    }

    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};
