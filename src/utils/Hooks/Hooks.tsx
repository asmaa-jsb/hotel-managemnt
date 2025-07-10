import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRooms } from "@/services/API/Roomapi";
import type {IRoomList } from "@/interfaces/RoomInterface";
import { createFacility, deleteFacility, fetchFacilities, updateFacility } from "@/services/API/Facilities";
import type { FacilityPayload, IRoomFacilities } from "@/interfaces/FacilityInterface";

export const useRooms = () => {
  return useQuery<IRoomList>({
    queryKey: ["rooms"],
    queryFn: () => fetchRooms(),
  });
};

export const useRoomsFacilities = () => {
  return useQuery<IRoomFacilities>({
    queryKey: ["facilities"],
    queryFn: fetchFacilities,
  });
};

export const useDeleteFacility  = ()=>{
  const queryClient  = useQueryClient();
  return useMutation({
    mutationFn : (id:string) => deleteFacility(id),
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ["facilities"] });

    } ,

    onError: (error) => {
      console.error("Error deleting facility:", error);
    },

  })
}

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