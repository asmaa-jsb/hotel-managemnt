import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/pages/UserPortal/Hero/Hero";
import PopularAds from "../PopularAdds/PopularAds";
import Houses from "../Houses/Houses";
import Hotels from "../Hotels/Hotels";
import TestimonialCarousel from "../TestimonialsCard/TestmonialsCard";

const LandingPage = () => {
  const location = useLocation();
  const reviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.scrollTo === "reviews" && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>

      <Hero />
      <PopularAds />
      <Houses />
      <Hotels />
      <div ref={reviewRef} id="reviews">
        <TestimonialCarousel />
      </div>
    </>
  );
};

export default LandingPage;