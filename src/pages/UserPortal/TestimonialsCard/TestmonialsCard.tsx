import {
  Box,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import family1 from "@/assets/Images/family1.png";
import arrowLeft from "@/assets/Images/arrow1.png";
import arrowRight from "@/assets/Images/arrow2.png";

const testimonials = [
  {
    name: "Angga",
    title: "Happy Family",
    job: "Product Designer",
    text: "What a great trip with my family and I should try again next time soon ...",
    image: family1,
    rating: 5,
  },
  {
    name: "Angga",
    title: "Happy Family",
    job: "Product Designer",
    text: "What a great trip with my family and I should try again next time soon ...",
    image: family1,
    rating: 5,
  },
  {
    name: "Angga",
    title: "Happy Family",
    job: "Product Designer",
    text: "What a great trip with my family and I should try again next time soon ...",
    image: family1,
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: { xs: 6, sm: 8, md: 4 },
        px: { xs: 2, sm: 4, md: 10 },
        width: "100%",
      }}
    >
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "flex-start",
                gap: { xs: 4, sm: 8 },
                mt: { xs: 6, sm: 0 },
                width: "100%",
              }}
            >
              {/* Left Box containing background and image */}
              <Box
                sx={{
                  width: { xs: 320, sm: 440 },
                  height: { xs: 420, sm: 520 },
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {/* خلفية بيضاء */} 
                <Box
                  sx={{
                    position: "absolute",
                    top: 2,
                    left: 0,
                    width: "80%",
                    height: "95%",
                    backgroundColor: "#fff",
                    borderRadius: "28px",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.05)",
                    zIndex: 1,
                  }}
                />

                {/* الصورة */} 
                <Box
                  component="img"
                  src={item.image}
                  alt="testimonial"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: { xs: 20, sm: 28 }, // زحزحة لليمين
                    width: { xs: 280, sm: 380 },
                    height: { xs: 400, sm: 500 },
                    borderRadius: "24px",
                    objectFit: "cover",
                    zIndex: 2,
                  }}
                />
              </Box>

              {/* Right Text */}
              <Box
                sx={{
                  mt: { xs: 0, sm: 6 },
                  textAlign: { xs: "center", sm: "left" },
                  maxWidth: { xs: "100%", sm: "640px", md: "700px" },
                }}
              >
                <Typography
                  fontWeight={700}
                  color="#081735"
                  fontSize={{ xs: 22, sm: 26, md: 28 }}
                  mb={1.5}
                >
                  {item.title}
                </Typography>

                <Box
                  display="flex"
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                  alignItems="center"
                  mb={1.5}
                >
                  {[...Array(item.rating)].map((_, i) => (
                    <Box
                      key={i}
                      component="span"
                      sx={{
                        color: "#FFB400",
                        fontSize: 24,
                      }}
                    >
                      ★
                    </Box>
                  ))}
                </Box>

                <Typography
                  fontSize={{ xs: 18, sm: 20 }}
                  fontWeight={500}
                  color="#081735"
                  mb={3}
                  lineHeight={1.8}
                >
                  {item.text}
                </Typography>

                <Typography fontSize={14} color="#9E9E9E" mb={4}>
                  {item.name}, {item.job}
                </Typography>

                {/* Arrows */}
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                >
                  <IconButton
                    className="custom-prev"
                    sx={{
                      width: 56,
                      height: 56,
                      border: "3px solid #3F5BF6",
                      borderRadius: "50%",
                      p: 1.5,
                    }}
                  >
                    <Box
                      component="img"
                      src={arrowLeft}
                      alt="prev"
                      sx={{ width: 24, height: 24 }}
                    />
                  </IconButton>

                  <IconButton
                    className="custom-next"
                    sx={{
                      width: 56,
                      height: 56,
                      border: "3px solid #3F5BF6",
                      borderRadius: "50%",
                      p: 1.5,
                    }}
                  >
                    <Box
                      component="img"
                      src={arrowRight}
                      alt="next"
                      sx={{ width: 24, height: 24 }}
                    />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialCarousel;
