import type { CreateBooking } from "@/interfaces/Interfaces";
import { axiosInstance, BOOKINGS } from "../EndPoints/EndPoints";
/************admin******** */
  export const fetchBookings = async() =>{
  const response = await axiosInstance.get(BOOKINGS.GET_ALL_BOOKINGS, {

  });

  return response.data;

 }
export  const deleteBooking = async (id:string) : Promise <void> =>{
     
  
  const response =  await  axiosInstance.delete(BOOKINGS.DELETE_BOOKING_BY_ID(String(id)))
    
      return response.data;
  
   }
/***********user**************** */
export const createBooking= async (payload:CreateBooking)=>{
  const response =  await  axiosInstance.post(BOOKINGS.CREATE_BOOKING, payload)
    
      return response.data;
}
