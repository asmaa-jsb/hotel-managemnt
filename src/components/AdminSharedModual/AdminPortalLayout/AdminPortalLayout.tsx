import { Box, Toolbar, useTheme, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/sideBar";
import { useEffect, useState } from "react";
import HotelNavbar from "../HotalNavbar/HotelNavbar";
import { HandleLogout } from "@/utils/HelperFunctions/HelperFunctions";
import { useDispatch } from "react-redux";


const PortalMainLayout = () => {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("open");
    return saved === "true";
  });



  useEffect(() => {
    localStorage.setItem("open", open.toString());
  }, [open]);

  return (
    <Box>
      {isMobileOrTablet ? (
        <>
          <HotelNavbar setOpen={setOpen} open={open} />
          {open && (
            <Sidebar open={open} setOpen={setOpen} onLogout={ ()=>HandleLogout(dispatch, navigate)} />
          )}

          <Box component="main">
            <Toolbar />
            <Box px={2}>
              <Outlet />
            </Box>
          </Box>
        </>
      ) : (
        <Box display="flex">
          <Sidebar open={open} setOpen={setOpen} onLogout={()=>HandleLogout(dispatch, navigate)} />

          <Box sx={{ flexGrow: 1 }}>
            <HotelNavbar setOpen={setOpen} open={open} />
            <Toolbar />
            <Box px={3}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PortalMainLayout;
