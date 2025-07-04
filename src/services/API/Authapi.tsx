import type { IRegisterFormInputs } from "@/interfaces/AuthInterface";
import { axiosInstance, USERS_URLS } from "../EndPoints/EndPoints";

export const registerUser = async (data: IRegisterFormInputs) => {
  const formData = new FormData();
  formData.append("userName", data.userName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("confirmPassword", data.confirmPassword);
  formData.append("phoneNumber", data.phoneNumber.toString());
  formData.append("country", data.country);
  formData.append("role", "user");

  if (data.profileImage && data.profileImage[0]) {
    formData.append("profileImage", data.profileImage[0]);
  }

  const response = await axiosInstance.post(USERS_URLS.REGISTER, formData);
  return response.data;
};