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

import AuthInput from "@/components/AuthInput";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import { useState } from "react";
import type { LoginFormInputs } from "@/interfaces/AuthInterface";

const Login = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      CookieServices.set("token", response?.data?.data?.token, {
        path: "/",
        maxAge: 86400,
      });
      console.log("Login Response:", response.data);
      toast.success(response?.data?.message || "Logged in successfully!");
      navigate("/rooms");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Login failed:");
      console.error("Login failed:", error);
      setLoading(false);
    }
  };

  return (
    <Box className="form">
      <Grid sx={{ width: "100%" }}>
        <Typography component="h1" className="form-title1">
          Sign in
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you don’t have an account register You can{" "}
          <Link href="/register" className="register-link">
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
          onClick={() =>
            navigate("/change-password", { state: { email: watch("email") } })
          }
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
