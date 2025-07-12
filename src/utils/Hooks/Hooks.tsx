import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "@/services/API/Roomapi";
import type { IRoomList } from "@/interfaces/RoomInterface";

export const useRooms = () => {
  return useQuery<IRoomList>({
    queryKey: ["rooms"],
    queryFn: () => fetchRooms(),
  });
};

// export const useRoomsFacilities = () => {
//   return useQuery<IRoomFacilities>({
//     queryKey: ["rooms"],
//     queryFn: () => fetchRooms(),
//   });
// };
