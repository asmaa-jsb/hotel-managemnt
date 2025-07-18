
import type { Review, ReviewsApiResponse } from "@/interfaces/Interfaces";
import { axiosInstance, REVIEWS_URLS } from "../EndPoints/EndPoints";

export const createReview= async (payload:Review)=>{
  const response =  await  axiosInstance.post(REVIEWS_URLS.CREATE_REVIEW, payload)
    
      return response.data;
}

export const getAllRoomReviews= async (id:string): Promise<ReviewsApiResponse['data']>=>{
  const response =  await  axiosInstance.get(REVIEWS_URLS.GET_ALL_REVIEWS(id))
    
      return response.data;
}