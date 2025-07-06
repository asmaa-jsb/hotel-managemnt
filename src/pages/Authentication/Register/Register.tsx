import defultImg from "@/assets/Images/default-avatar.png";
import AuthInput from "@/components/AuthInput";
import AuthSubmitButton from "@/components/AuthSubmitButton";
import type { IRegisterFormInputs } from "@/interfaces/AuthInterface";
import { registerUser } from "@/services/API/Authapi";
import {
  ConfirmPassValidation,
  CountryValidation,
  EmailValidation,
  PassValidation,
  PhoneNumberValidation,
  UserNameValidation,
} from "@/utils/Validations/Validations";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Avatar, Box, Grid, Link, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<IRegisterFormInputs>({ mode: "onChange" });
  const navigate = useNavigate();
  const passwordValue = watch("password");

  const onSubmit = (data: IRegisterFormInputs) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data?.message || "Registered successfully!"); 
      navigate("login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("profileImage", e.target.files as any);
    }
  };

  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [watch("confirmPassword"), watch("password")]);

  return (
    <Box className="form register-section">
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

      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        className="formRegister-Content"
        noValidate
      >
        <Box className="registerImgP">
          <Avatar
            src={previewImage || defultImg}
            className="AvatarImg"
            sx={{
              border: previewImage ? "2px solid #1976d2" : "none",
            }}
          />

          {!previewImage && (
            <Box onClick={handleImageClick} className="Avatar-overlay">
              <CameraAltIcon />
            </Box>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </Box>
        {/* ------------------------ User Name ----------------------- */}
        <AuthInput
          label="User Name"
          name="userName"
          placeholder="Please type here ..."
          required
          error={!!errors.userName}
          helperText={errors.userName?.message as string}
          register={register("userName", UserNameValidation)}
        />
        {/* ------------------------ Phone Number and Country ----------------------- */}
        <Grid container spacing={2}>
          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <AuthInput
              label="Phone Number"
              name="phoneNumber"
              placeholder="Please type here ..."
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message as string}
              register={register("phoneNumber", PhoneNumberValidation)}
            />
          </Grid>
          <Grid size={{ md: 6, sm: 12, xs: 12 }}>
            <AuthInput
              label="Country"
              name="country"
              placeholder="Please type here ..."
              required
              error={!!errors.country}
              helperText={errors.country?.message as string}
              register={register("country", CountryValidation)}
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
        {/* ------------------------ Confirm Password ----------------------- */}
        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Please type here ..."
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message as string}
          register={register(
            "confirmPassword",
            ConfirmPassValidation(passwordValue)
          )}
        />
        <AuthSubmitButton label="Sign up" loading={isPending} />
        <Box sx={{ height: 24 }} />
      </Box>
    </Box>
  );
};

export default Register;
 