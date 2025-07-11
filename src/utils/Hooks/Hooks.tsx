import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchRooms,
  DeleteRoom,
  createRoom,
  fetchFacilities,
  updateRoom,
  fetchRoomDetails,
} from "@/services/API/Roomapi";
import { createFacility, deleteFacility, updateFacility } from "@/services/API/Facilities";
import type { CreateRoomInput, Facility, IRoomList, Room } from "@/interfaces/RoomInterface";
import type { FacilityPayload, IRoomFacilities } from "@/interfaces/FacilityInterface";
import { fetchBookings, deleteBooking } from "@/services/API/Bookingapi";
import { fetchUsers, getUserProfile } from "@/services/API/UsersApi";
import { fetchChart } from "@/services/API/ChartApi";

/**********Rooms*************/
export const useRooms = (page: number, size: number) => {
  return useQuery<IRoomList>({
    queryKey: ["rooms", page, size],
    queryFn: () => fetchRooms(page, size),
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

/************Bookings****************/
export const useBookings = () => {
  return useQuery<IRoomFacilities>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

/*******************Users********************/
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useUserProfile = (id: string) => {
  return useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
  });
};

/****************Charts******************/
export const useChart = () => {
  return useQuery({
    queryKey: ["chart"],
    queryFn: fetchChart,
  });
};

/******************Facilities******************/
export const useRoomsFacilities = () => {
  return useQuery<IRoomFacilities>({
    queryKey: ["facilities"],
    queryFn: fetchFacilities,
  });
};

export const useDeleteFacility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFacility(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
    onError: (error) => {
      console.error("Error deleting facility:", error);
    },
  });
};

export const useAddFacility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FacilityPayload) => createFacility(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useUpdateFacility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FacilityPayload }) =>
      updateFacility({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useFacilities = () =>
  useQuery<Facility[]>({
    queryKey: ["facilities"],
    queryFn: fetchFacilities,
  });
