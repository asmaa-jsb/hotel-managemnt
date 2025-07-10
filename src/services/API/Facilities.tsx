import type { IRoomFacilities, FacilityPayload  } from "@/interfaces/FacilityInterface";
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

export const createFacility  = async (payload: FacilityPayload)=>{
const response = await axiosInstance.post (
  FACILITIES_URLS.CREATE_FACILITIES , payload)
return response.data;
}


export const updateFacility = async ({id,payload,}: {id: string; payload: FacilityPayload ;}) => {
  const response = await axiosInstance.put(
    FACILITIES_URLS.UPDATE_FACILITIES(id),
    payload
  );
  return response.data;
};


// ✅ أولًا: شكل الـ arguments (المدخلات)
// 👇 بدل ما نكتب الدالة كده:

// const updateFacility = async (id: string, payload: UpdateFacilityPayload) => {}
// أنتي كتبتيها كده:


// async ({ id, payload }: { id: string; payload: UpdateFacilityPayload }) => { ... }
// وده اسمه object destructuring مع typing.
// بمعنى:

// الدالة بتستقبل object فيه حقلين: id و payload

// وبتفك الحقول دول مباشرة من الـ object

// وتعرف نوع كل واحد منهم (id: string, payload: UpdateFacilityPayload)
