import { Box, Toolbar } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/sideBar";
import { useEffect, useState } from "react";
import HotelNavbar from "../HotalNavbar/HotelNavbar";
import CookieServices from "@/services/CookieServices/CookieServices";
import { useDispatch } from "react-redux";
import { clearLoginData } from "@/redux/slices/authSlice";

// const drawerWidth = 240;
// const collapsedWidth = 70;

const PortalMainLayout = () => {
   const navigate = useNavigate();
    const dispatch = useDispatch();
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("open");
    return saved === "true"});
    // Handle Logout
    const handleLogout = () => {
      dispatch(clearLoginData());
      CookieServices.remove('token');

      navigate("/login");
    };
      useEffect(() => {
    localStorage.setItem("open", open.toString());
  }, [open]);
  return (
    <Box display="flex">
      <Sidebar open={open} setOpen={setOpen} onLogout={handleLogout} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          /// ml: `${open ? drawerWidth : collapsedWidth}px`,
          transition: "margin-left 0.3s ease",
          // backgroundColor: "#f9f9f9",
          // minHeight: "100vh",
        }}
      >
        <HotelNavbar/>
        <Box>
          <Toolbar />
        </Box>
        <Box px={3} >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PortalMainLayout;
