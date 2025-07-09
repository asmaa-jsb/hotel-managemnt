import type { IRoomFacilities } from "@/interfaces/FacilityInterface";
import { axiosInstance, FACILITIES_URLS } from "../EndPoints/EndPoints";

export const fetchFacilities = async (): Promise<IRoomFacilities> => {
  const response = await axiosInstance.get(FACILITIES_URLS.GET_ALL_FACILITIES);
  console.log("Facilities Response:", response.data);
  return response.data;
};


export const deleteFacility = async (id:string) : Promise <void> =>{
  const response = await axiosInstance.delete (
    FACILITIES_URLS.DELETE_FACILITIES(id)
  );
  return response.data;
} 

