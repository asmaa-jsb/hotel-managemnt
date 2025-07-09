import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRooms,
  DeleteRoom,
  createRoom,
  fetchFacilities,
  updateRoom,
  fetchRoomDetails,
} from "@/services/API/Roomapi";
import type { CreateRoomInput, Facility, IRoomList, Room } from "@/interfaces/RoomInterface";

export const useRooms = () => {
  return useQuery<IRoomList>({
    queryKey: ["rooms"],
    queryFn: () => fetchRooms(),
  });
};

export const useRoomDetails = (id?: string) => {
  return useQuery<Room>({
    queryKey: ["roomDetails", id],
    queryFn: () => fetchRoomDetails(id!),
    enabled: !!id,
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      console.error("Error deleting room:", error);
    },
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomInput) => createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      console.error("Error creating room:", error);
    },
  });
};

export const useFacilities = () =>
  useQuery<Facility[]>({
    queryKey: ["facilities"],
    queryFn: fetchFacilities,
  });

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateRoomInput }) =>
      updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      console.error("Error updating room:", error);
    },
  });
};
