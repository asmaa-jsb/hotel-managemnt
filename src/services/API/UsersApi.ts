import { axiosInstance, USERS } from "../EndPoints/EndPoints";

  export const fetchUsers = async() =>{
  const response = await axiosInstance.get(USERS.GET_ALL_USERS);

  return response.data;

 }
export  const getUserProfile = async (id:string) : Promise <void> =>{
     
  
  const response =  await  axiosInstance.get(USERS.GET_USER_PROFILE(String(id)))
    
      return response.data;
  
   }