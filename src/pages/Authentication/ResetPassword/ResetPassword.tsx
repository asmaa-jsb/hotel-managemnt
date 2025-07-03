import React from "react";
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import CookieServices from "@/services/CookieServices/CookieServices";
import toast from "react-hot-toast";

interface IResetPassword {
  otp: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({ mode: "onChange" });

  const onSubmit = async (data: IResetPassword) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.RESET_PASSWORD, data);
      CookieServices.set("token", response?.data?.data?.token);
      toast.success(response?.data?.message || "Reset successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.message || "Reset Password failed:");
    }
  };

  const password = watch("password");

  return (
    <Box className="form">
      <Grid sx={{ width: "100%" }}>
        <Typography component="h1" className="form-title">
          Reset Password
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you already have an account{" "}
          <Link href="/login" className="login-link">Login here!</Link>
        </Typography>
      </Grid>

      <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* OTP */}
        <TextField
          required
          fullWidth
          label="OTP"
          {...register("otp", { required: "OTP is required" })}
          error={!!errors.otp}
          helperText={errors.otp?.message}
          className="input-field"
        />

        {/* Password */}
        <TextField
          required
          fullWidth
          type="password"
          label="Password"
          autoComplete="new-password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
          error={!!errors.password}
          helperText={errors.password?.message}
          className="input-field"
        />

        {/* Confirm Password */}
        <TextField
          required
          fullWidth
          type="password"
          label="Confirm Password"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          className="input-field"
        />

        <Button
          type="submit"
          className="submit-btn"
          fullWidth
          variant="outlined"
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
