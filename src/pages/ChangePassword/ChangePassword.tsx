import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type ChangePasswordFormInputs from "@/interfaces/changePassword";
import CircularProgress from "@mui/material/CircularProgress";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <Typography component="h1" className="form-title">
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
        {/* Email Field */}
        <TextField
          label="Email Address"
          required
          fullWidth
          id="email"
          type="email"
          autoComplete="email"
          defaultValue={email}
          disabled
          className="input-field margin-bottom"
          placeholder="Please type here ..."
          {...register("email")}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="submit-btn"
          fullWidth
          disabled={loading}
          variant="outlined"
        >
          {loading ? (
            <span className="send-email">
              <CircularProgress size={18} color="inherit" />
              Sending...
            </span>
          ) : (
            "Send Email"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
