// src/utils/HelperFunctions/HelperFunctions.tsx
import CookieServices from "@/services/CookieServices/CookieServices";
import { clearLoginData } from "@/redux/slices/authSlice";

export const HandleLogout = (dispatch: any, navigate: any) => {
  dispatch(clearLoginData());
  CookieServices.remove("token");
  navigate("/auth/login");
};
