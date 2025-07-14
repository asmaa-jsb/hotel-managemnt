import Hero from "@/pages/UserPortal/Hero/Hero";
import React from "react";
import PopularAds from "../PopularAdds/PopularAds";
import Houses from "../Houses/Houses";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularAds />
      <Houses />
    </>
  );
};

export default LandingPage;
