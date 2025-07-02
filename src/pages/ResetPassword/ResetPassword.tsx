import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

interface IResetPassword
{
  otp:string , 
  password:string , 
  confirmPassword: string;
}


const {register , formState :{errors} , handleSubmit} = useForm<IResetPassword>({mode:'onChange'});

const onSubmit =async (data)=>
{
  try{
      const response = await axiosInstance.post(USERS_URLS.RESET_PASSWORD , data)
  }
  catch (error)
  {
      console.log(error)
  }
}

const ResetPassword = () => {
  return (
    <>
     
    </>
  );
};

export default ResetPassword;
