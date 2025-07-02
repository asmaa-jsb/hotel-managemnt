
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import  CookieServices from "../../services/CookieServices/CookieServices";
import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import { Link } from "react-router-dom";
import { EmailValidation, PassValidation } from "@/utils/Validations/Validations";
;
interface LoginFormInputs {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<LoginFormInputs>({ mode: "onChange" });
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormInputs) => {
    try {

      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      CookieServices.set("token", response?.data?.data?.token);
      toast.success(response?.data?.message || "Logged in successfully!");
      navigate("/home-page");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Login failed:");
      console.error("Login failed:", error);
    }
  };
  return (
    <Box className="form">
      <Grid sx={{ width: "100%" }}>
        <Typography component="h1" className="form-title">
          Sign in
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you don’t have an account register You can{"   "}
          <Link to={"/register"} className="register-link">Register here !</Link>
        </Typography>
      </Grid>
      <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
        {/* ------------------------ email ----------------------- */}
        <TextField
          label="Email Address"
          required
          fullWidth
          id="email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={
            typeof errors.email?.message === "string"
              ? errors.email.message
              : undefined
          }
          className="input-field margin-bottom"
          placeholder="Please type here ..."
          {...register("email", EmailValidation)}
        />
        {/* ------------------------ password ----------------------- */}
        <TextField
          required
          fullWidth
          type="password"
          id="password"
          autoComplete="password"
          label="Password"
          error={!!errors.password}
          helperText={
            typeof errors.password?.message === "string"
              ? errors.password.message
              : undefined
          }
          placeholder="Please type here ..."
          className="input-field"
          {...register("password", PassValidation)}
        />
        {/* ------------------------ forgot password ----------------------- */}

        <Typography
          variant="body2"
          className="link-text"
          onClick={() =>
            navigate("/change-password", { state: { email: watch("email") } })
          }
        >

       
          Forgot Password ?
        </Typography>
        {/* ==================================== */}
        <Button
          type="submit"
          className="submit-btn"
          fullWidth
          variant="outlined"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
export default Login;
