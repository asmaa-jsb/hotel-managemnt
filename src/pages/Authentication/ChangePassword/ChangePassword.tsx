import { useState } from "react";
import { Box, Typography, Grid, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthInput from "@/components/AdminSharedModual/AuthInput/AuthInput";
import AuthSubmitButton from "@/components/AdminSharedModual/AuthSubmitButton/AuthSubmitButton";

import CookieServices from "@/services/CookieServices/CookieServices";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import type { IChangePass } from "@/interfaces/AuthInterface";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IChangePass>({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const password = watch("newPassword");

  const onSubmit = async (data: IChangePass) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(USERS_URLS.CHANGE_PASSWORD, data);
      CookieServices.set("token", res?.data?.data?.token);
      toast.success(res?.data?.message || "Password changed successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Change password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      <Box className="form" maxWidth="400px" width="100%">
        <Grid sx={{ width: "100%" }}>
          <Typography component="h1" className="form-title1">
            Change Password
          </Typography>
          <Typography className="form-subtitle" variant="body2">
            Make sure to choose a strong password
          </Typography>
        </Grid>

        <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
          {/* ---------------- Old Password ---------------- */}
          <AuthInput
            label="Old Password"
            name="oldPassword"
            type={showOldPassword ? "text" : "password"}
            placeholder="Enter your current password"
            required
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            register={register("oldPassword", { required: "Old password is required" })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* ---------------- New Password ---------------- */}
          <AuthInput
            label="New Password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            required
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            register={register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* ---------------- Confirm Password ---------------- */}
          <AuthInput
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            register={register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <AuthSubmitButton label="Change Password" loading={loading} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
