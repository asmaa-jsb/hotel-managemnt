import { Box, Toolbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import { useState } from "react";
import HotelNavbar from '../components/HotelNavbar'

// const drawerWidth = 240;
// const collapsedWidth = 70;

const PortalMainLayout = () => {
  const [open, setOpen] = useState(true);
  return (


    
    <Box display="flex">
      <Sidebar open={open} setOpen={setOpen} />
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
        <Box px={3} py={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PortalMainLayout;
