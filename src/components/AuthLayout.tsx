import { Box, Grid, Typography } from "@mui/material";
import type { JSX } from "@emotion/react/jsx-runtime";

import { Outlet, useLocation } from "react-router-dom";
import { logo } from "@/assets/Images";

const AuthLayout: React.FC = (): JSX.Element => {
  const location = useLocation();
  const path = location.pathname;

  const pathName = path.includes("register")
    ? "Register"
    : path.includes("change-password")
    ? "ChangePassword"
    : path.includes("reset-password")
    ? "ResetPassword"
    : "";
  return (
    <Grid container component="main" className="AuthContainer">
      {/* Right Form Section */}
      <Grid size={{ md: 6, sm: 12, xs: 12 }} sx={{ order: { xs: 2, md: 1 } }}>
        <img src={logo} alt="logo" style={{ padding: "30px" }} />
        <Outlet />
      </Grid>
      {/* Left Image Section */}
      <Grid
        className={`${
          pathName === "Register"
            ? "registerImg"
            : pathName === "ChangePassword" || pathName === "ResetPassword"
            ? "reset-forgetImg"
            : ""
        } leftImageForm`}
        size={{ md: 6, sm: 12, xs: 12 }}
        sx={{
          order: { xs: 1, md: 2 },
        }}
      >
        <Box className="img-content">
          <Typography component="h1">
            {pathName === "Register"
              ? "Sign up to Roamhome"
              : pathName === "ChangePassword"
              ? "Forgot password"
              : pathName === "ResetPassword"
              ? "Reset Password"
              : "Sign in to Roamhome"}
          </Typography>
          <Typography component="p">Homes as unique as you.</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
