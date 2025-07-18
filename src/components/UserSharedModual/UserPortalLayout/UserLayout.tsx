
import Navbar from "../Navbar/Navbar";
import Footer from "@/components/UserSharedModual/Footer/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar />
    <Box sx={{marginTop:'130px'}}>
        <Outlet/>
      <Footer />
    </Box>
    </>
  );
};

export default UserLayout;
