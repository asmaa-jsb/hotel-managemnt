import { Box, Grid, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// Reusable components
import AuthInput from "@/components/AdminSharedModual/AuthInput/AuthInput";
import AuthSubmitButton from "@/components/AdminSharedModual/AuthSubmitButton/AuthSubmitButton";

import type ForgetPasswordFormInputs from "@/interfaces/AuthInterface";
import { EmailValidation } from "@/utils/Validations/Validations";

const ForgetPassword = () => {
  const { register, handleSubmit } = useForm< ForgetPasswordFormInputs>({mode: "onChange"});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:  ForgetPasswordFormInputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        USERS_URLS.FORGET_PASSWORD,
        data
      );
      console.log(response);
      
      toast.success(response?.data?.message || "Email sent successfully!");
      navigate("/reset-password", {state:{ email : data.email}});
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "email sending failed");
   
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
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Please type here ..."
          required
          register={register("email", EmailValidation)}
        />

        {/* Submit Button */}
        <AuthSubmitButton label="Send Email" loading={loading} />
      </Box>
    </Box>
  );
};

export default ForgetPassword;
