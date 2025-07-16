import Hero from "@/pages/UserPortal/Hero/Hero";
import PopularAds from "../PopularAdds/PopularAds";
import Houses from "../Houses/Houses";
import Hotels from "../Hotels/Hotels";
import TestimonialCarousel from "../TestimonialsCard/TestmonialsCard";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularAds />
      <Houses />
      <Hotels />
      <TestimonialCarousel />
    </>
  );
};

export default LandingPage;
