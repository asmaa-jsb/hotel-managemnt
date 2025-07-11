import { Box, Grid, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// Reusable components
import AuthInput from "@/components/AuthInput";
import AuthSubmitButton from "@/components/AuthSubmitButton";

import type ChangePasswordFormInputs from "@/interfaces/AuthInterface";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm<ChangePasswordFormInputs>();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || "";

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        USERS_URLS.FORGET_PASSWORD,
        data
      );
      toast.success(response?.data?.message || "Email sent successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error in reset password");
      console.error("Reset failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="form">
      <Grid sx={{ width: "100%" }}>
        <Typography component="h1" className="form-title1">
          Forgot Password
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you already have an account register{" "}
          <Link className="error-reset" onClick={() => navigate("/login")}>
            Login here!
          </Link>
        </Typography>
      </Grid>

      <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
        {/* Email Field (disabled) */}
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Please type here ..."
          required
          defaultValue={email}
          disabled
          register={register("email")}
        />

        {/* Submit Button */}
        <AuthSubmitButton label="Send Email" loading={loading} />
      </Box>
    </Box>
  );
};

export default ResetPassword;
