
import Navbar from "../Navbar/Navbar";
import Footer from "@/components/UserSharedModual/Footer/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
};

export default UserLayout;
