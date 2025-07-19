import type {
  AddToFavoritesResponse,
  FavoriteRoomsResponse,
} from "@/interfaces/Favorites";
import { axiosInstance, FAVORITES_URL } from "../EndPoints/EndPoints";

// POST add to favorites
export const addToFavorites = async (roomId: string): Promise<AddToFavoritesResponse> => {
  const response = await axiosInstance.post(FAVORITES_URL.ADD_TO_FAVORITES, { roomId });
  const data = response.data;
  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};


// DELETE from favorites
export const removeFavoriteRoom = async (roomId: string): Promise<AddToFavoritesResponse> => {
  const response = await axiosInstance.delete(
    FAVORITES_URL.REMOVE_FAVORITES(roomId), 
    {
      data: { roomId }, 
    }
  );
  return response.data;
};






// GET all favorite rooms
export const getFavoriteRooms = async (): Promise<FavoriteRoomsResponse> => {
  const response = await axiosInstance.get(FAVORITES_URL.GET_ALL_FAVORITES);
  return response.data;
};
