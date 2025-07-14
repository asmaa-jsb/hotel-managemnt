 import CookieServices from "@/services/CookieServices/CookieServices";
import { useDispatch } from "react-redux";
import { clearLoginData } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
export const HandleLogout = () => {
     const navigate = useNavigate();
      const dispatch = useDispatch();
    dispatch(clearLoginData());
    CookieServices.remove("token");
    navigate("/login");
  };