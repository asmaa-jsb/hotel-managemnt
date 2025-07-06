import { Box, Toolbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

const PortalMainLayout = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1}>
        <Box bgcolor="#f9f9f9">
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
