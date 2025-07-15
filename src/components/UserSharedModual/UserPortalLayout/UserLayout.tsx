
import Navbar from "../Navbar/Navbar";
import Hero from "../../../pages/UserPortal/Hero/Hero";
import LandingPage from "@/pages/UserPortal/LandingPage/LandingPage";
import Footer from "@/components/UserSharedModual/Footer/Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  );
};

export default UserLayout;
