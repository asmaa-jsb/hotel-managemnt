
import { Box, Grid, Typography,  Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import CookieServices from "@/services/CookieServices/CookieServices";
import toast from "react-hot-toast";
import { EmailValidation } from "@/utils/Validations/Validations";
import AuthInput from "@/components/AdminSharedModual/AuthInput/AuthInput";

interface IResetPassword {
  email:string;
  seed: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
 
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({ mode: "onChange" });

  const onSubmit = async (data: IResetPassword) => {
    try {
      const response = await axiosInstance.post(
        USERS_URLS.RESET_PASSWORD,
        data
      );
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
        <Typography component="h1" className="form-title1">
          Reset Password
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you already have an account{" "}
          <Link href="/login" className="login-link">
            Login here!
          </Link>
        </Typography>
      </Grid>

      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/*Email*/}
              <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Please type here ..."
          required
          defaultValue={state.email}
          disabled
          register={register("email", EmailValidation)}
        />
        {/* seed */}
          <AuthInput
          required
           name="seed"
          label="seed"
        register={register("seed", { required: "seed is required" })}
          error={!!errors.seed}
          helperText={errors.seed?.message}
           placeholder="Please type here ..."
          
        />

        {/* Password */}
       <AuthInput
          required
         name="password"
          type="password"
          label="Password"
         register= {register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
           placeholder="Please type here ..."
        />

        {/* Confirm Password */}
       <AuthInput
          required
         name="confirmPassword"
          type="password"
          label="Confirm Password"
         register={register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
           placeholder="Please type here ..."
        />

        <Button
          type="submit"
          className="submit-btn"
         
          variant="outlined"
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
