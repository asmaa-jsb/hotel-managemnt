import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchRooms,
  DeleteRoom,
  createRoom,
  fetchFacilities,
  updateRoom,
  fetchRoomDetails,
} from "@/services/API/Roomapi";
import {
  createFacility,
  deleteFacility,
  fetchRoomFacilities,
  updateFacility,
} from "@/services/API/Facilities";
import type {
  CreateRoomInput,
  Facility,
  IRoomList,
  Room,
} from "@/interfaces/RoomInterface";
import type {
  FacilityPayload,
  IRoomFacilities,
} from "@/interfaces/FacilityInterface";
import { fetchBookings, deleteBooking } from "@/services/API/Bookingapi";
import { fetchUsers, getUserProfile } from "@/services/API/UsersApi";
import { fetchChart } from "@/services/API/ChartApi";
import type { CreateAdsInput, IAdsList } from "@/interfaces/AdsInterface";
import { createADS, fetchAds, updateAds } from "@/services/API/Adsapi";

/**********Rooms*************/
export const useRooms = (page: number, size: number) => {
  return useQuery<IRoomList>({
    queryKey: ["rooms", page, size],

    queryFn: () => fetchRooms(page, size),
  });
};
// لأن React Query:

// يخزّن (caches)
// البيانات بناءً على (queryKey()

// ولما تطلبي نفس المفتاح مرة ثانية → يعرض البيانات فورًا بدون ما يعيد الطلب

// ولو غيرتي المفتاح → يعرف إن لازم يجلب بيانات جديدة

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
    // هي الدالة اللي فعليًا ترسل البيانات للسيرفر. (mutationFn)
    mutationFn: (data: CreateRoomInput) => createRoom(data),
    onSuccess: () => {
      //"أبطل صلاحية البيانات الموجودة بالكاش، وارجع جيبها من جديد من السيرفر.(invalidateQueries)"
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
    enabled: id != null && id !== "",
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
    queryFn: fetchRoomFacilities,
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

export const useAds = (page: number, size: number) => {
  return useQuery<IAdsList>({
    queryKey: ["ads", page, size],

    queryFn: () => fetchAds(page, size),
  });
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdsInput) => createADS(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
    onError: (error) => {
      console.error("Error creating room:", error);
    },
  });
};

export const useUpdateAd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateAdsInput }) =>
      updateAds({ id, payload: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
    onError: (error) => {
      console.error("Error updating room:", error);
    },
  });
};
