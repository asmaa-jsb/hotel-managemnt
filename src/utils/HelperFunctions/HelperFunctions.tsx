import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "@/services/API/Roomapi";

export const useRooms = () =>
  useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });
