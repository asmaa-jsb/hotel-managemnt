import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import CookieServices from "../../../services/CookieServices/CookieServices";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import {
  EmailValidation,
  PassValidation,
} from "@/utils/Validations/Validations";

import AuthInput from "@/components/AdminSharedModual/AuthInput/AuthInput";
import AuthSubmitButton from "@/components/AdminSharedModual/AuthSubmitButton/AuthSubmitButton";
import { useState, useEffect } from "react";
import type { LoginFormInputs } from "@/interfaces/AuthInterface";
import type { RootState } from "@/redux/store";

import { useDispatch, useSelector } from "react-redux";
import { saveLoginData } from "@/redux/slices/authSlice";


const Login = () => {
    

  
 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state: RootState) => state.auth.loginData);

  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false); // 🔄 للتحكم في التوجيه بعد التحديث

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      const { token } = response.data.data;

      CookieServices.set("token", token); // ✅ خزّن التوكن
      dispatch(saveLoginData()); // ✅ حدث الـ Redux

      toast.success(response?.data?.message || "Logged in successfully!");
      setShouldRedirect(true); // ✅ فعّل التوجيه بعد تحديث Redux
    } catch (error: any) {
      toast.error(error?.message || "Login failed:");
      console.error("Login failed:", error);
      setLoading(false);
    }
  };

  // ✅ بمجرد ما يتحدث loginData ويتم السماح بالتوجيه
  useEffect(() => {
    if (shouldRedirect && loginData?.role) {
      if (loginData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [loginData, shouldRedirect, navigate]);

  return (
    <Box className="form">
      <Grid sx={{ width: "100%" }}>
        <Typography component="h1" className="form-title1">
          Sign in
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you don’t have an account register You can{" "}
          <Link href="/auth/register" className="register-link">
            Register here !
          </Link>
        </Typography>
      </Grid>

      <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
        {/* ------------------------ Email ----------------------- */}
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Please type here ..."
          required
          error={!!errors.email}
          helperText={errors.email?.message as string}
          register={register("email", EmailValidation)}
        />

        {/* ------------------------ Password ----------------------- */}
        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="Please type here ..."
          required
          error={!!errors.password}
          helperText={errors.password?.message as string}
          register={register("password", PassValidation)}
        />

        {/* ------------------------ Forgot Password ----------------------- */}
        <Typography
          variant="body2"
          className="link-text"
          onClick={() => navigate("/auth/forget-password")}
        >
          Forgot Password ?
        </Typography>

        {/* ------------------------ Submit Button ----------------------- */}
        <AuthSubmitButton label="Login" loading={loading} />
      </Box>
    </Box>
  );
};

export default Login;
