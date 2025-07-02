import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import  CookieServices from "../../services/CookieServices/CookieServices";
interface LoginFormInputs {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>({ mode: "onChange" });
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/users/login",
        data,
        {
          headers: {
            Authorization: `Bearer ${CookieServices.get("token") ?? ""}`,
          },
        }
      );
      CookieServices.set("token", response?.data?.data?.token);
    } catch (error) {
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
          <Link className="register-link">Register here !</Link>
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
          {...register("email", { required: "Email is required" })}
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
          {...register("password", { required: "Password is required" })}
        />
        {/* ------------------------ forgot password ----------------------- */}
        <Link variant="body2" className="link-text">
          Forgot Password ?
        </Link>
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
