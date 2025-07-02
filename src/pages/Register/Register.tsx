import { Box, Button, Grid, Link, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import CookieServices from "../../services/CookieServices/CookieServices";
import AuthInput from "@/components/AuthInpput";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import { USERS_URLS } from "@/services/EndPoints/EndPoints";
interface IRegisterFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  country: string;
}

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterFormInputs>({ mode: "onChange" });

  const onSubmit = async (data: IRegisterFormInputs) => {
    try {
      const response = await axios.post(USERS_URLS.REGISTER, data, {
        headers: {
          Authorization: `Bearer ${CookieServices.get("token") ?? ""}`,
        },
      });
      CookieServices.set("token", response?.data?.data?.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box className="form">
      <Grid sx={{ width: "100%" }}>
        <Typography component="h1" className="form-title">
          Sign up
        </Typography>
        <Typography className="form-subtitle" variant="body2">
          If you already have an account register You can{" "}
          <Link href="login" className="login-link">
            Login here !
          </Link>
        </Typography>
      </Grid>

      <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate>
        {/* ------------------------ User Name ----------------------- */}
        <AuthInput
          label="User Name"
          name="userName"
          placeholder="Please type here ..."
          required
          error={!!errors.userName}
          helperText={errors.userName?.message as string}
          register={register("userName", { required: "User Name is required" })}
        />

        {/* ------------------------ Phone Number and Country ----------------------- */}
        <Grid container spacing={1} className="">
          {/* Phone Number */}
          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <AuthInput
              label="Phone Number"
              name="phoneNumber"
              placeholder="Please type here ..."
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message as string}
              register={register("phoneNumber", {
                required: "Phone Number is required",
              })}
            />
          </Grid>

          {/* Country */}
          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <AuthInput
              label="Country"
              name="country"
              placeholder="Please type here ..."
              required
              error={!!errors.country}
              helperText={errors.country?.message as string}
              register={register("country", {
                required: "Country is required",
              })}
            />
          </Grid>
        </Grid>

        {/* ------------------------ Email ----------------------- */}
        <AuthInput
          label="Email Address"
          name="email"
          placeholder="Please type here ..."
          required
          error={!!errors.email}
          helperText={errors.email?.message as string}
          register={register("email", { required: "Email is required" })}
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
          register={register("password", { required: "Password is required" })}
        />

        {/* ------------------------ Confirm Password ----------------------- */}
        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Please type here ..."
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message as string}
          register={register("confirmPassword", {
            required: "Confirm Password is required",
          })}
        />

        {/* ==================================== */}
        <AuthSubmitButton label="Sign up" />
      </Box>
    </Box>
  );
};

export default Register;
