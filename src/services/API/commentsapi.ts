import type { Comment, CommentsApiResponse } from "@/interfaces/Interfaces";
import { axiosInstance, COMMENTS_URLS } from "../EndPoints/EndPoints";

export const createComment= async (payload:Comment)=>{
  const response =  await  axiosInstance.post(COMMENTS_URLS.CREATE_COMMENT, payload)
    
      return response.data;
}

export const getAllRoomComments= async (id:string): Promise<CommentsApiResponse['data']>=>{
  const response =  await  axiosInstance.get(COMMENTS_URLS.GET_ALL_COMMENTS(id))
    
      return response.data;
}
export const DeleteComment= async (id:string)=>{
  const response =  await  axiosInstance.delete(COMMENTS_URLS.DELETE_COMMENT(id))
    
      return response.data;
}
export const updateComment= async (id:string, payload:Comment)=>{
  const response =  await  axiosInstance.patch(COMMENTS_URLS.UPDATE_COMMENT(id), payload)
    
      return response.data;
}

