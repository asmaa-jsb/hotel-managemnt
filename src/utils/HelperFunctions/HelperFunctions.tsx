import type { Dispatch } from "@reduxjs/toolkit"; 
import { clearLoginData } from "@/redux/slices/authSlice";
import CookieServices from "@/services/CookieServices/CookieServices";

export const HandleLogout = (dispatch: Dispatch, navigate: (path: string) => void) => {
  dispatch(clearLoginData());
  CookieServices.remove("token");
  navigate("/auth/login");
};