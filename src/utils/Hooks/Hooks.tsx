import { useQuery } from "@tanstack/react-query";
import { fetchBookings, fetchRooms } from "@/services/API/Roomapi";
import type { IRoomList } from "@/interfaces/Interfaces";

export const useRooms = () => {
  return useQuery<IRoomList>({
    queryKey: ["rooms"],
    queryFn: () => fetchRooms(),
  });
};

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(), 
  });
}



// export const useRoomsFacilities = () => {
//   return useQuery<IRoomFacilities>({
//     queryKey: ["rooms"],
//     queryFn: () => fetchRooms(),
//   });
// };