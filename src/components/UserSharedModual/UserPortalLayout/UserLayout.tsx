
import Navbar from "../Navbar/Navbar";
import Footer from "@/components/UserSharedModual/Footer/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
 
  return (
    <>
    <Box sx={{position:"sticky", zIndex: (theme) => theme.zIndex.appBar}}>
       <Navbar />
       </Box>
     
    <Box    sx={{
      pt: 8, 
    }}>
        <Outlet/>
      <Footer />
    </Box>
    </>
  );
};

export default UserLayout;
