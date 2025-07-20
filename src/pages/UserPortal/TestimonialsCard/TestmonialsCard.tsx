import { Box, Typography, IconButton, Stack, Container } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import family1 from "@/assets/Images/family1.png";

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
    name: "Salma",
    title: "Lovely Stay",
    job: "UI Developer",
    text: "Super comfy and clean. Best vacation ever!",
    image: family1,
    rating: 4,
  },
];

// const arrowStyle = {
//   border: "2px solid #3F5BF6",
//   color: "#3F5BF6",
//   width: 50,
//   height: 50,
//   "&:hover": {
//     backgroundColor: "#3F5BF6",
//     color: "#fff",
//   },
// };

const TestimonialCarousel = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ maxWidth: "1400px", mx: "auto", my: { lg: 10, sm: 4, xs: 2 } }}
    >
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                justifyContent: "space-between",
                mt: { xs: 12, sm: 15, md: 20 },
                gap: 10,
              }}
            >
              {/* Left Image Section */}
              <Box
                sx={{
                  flexShrink: 0,
                  position: "relative",
                  width: "fit-content",
                }}
              >
                <Box
                  sx={{
                    width: 230,
                    height: 322,
                    borderRadius: "28px",
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: -12,
                    left: 20,
                    border: "1px solid #E5E5E5",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                />

                <Box
                  component="img"
                  src={item.image}
                  alt="testimonial"
                  sx={{
                    width: 230,
                    height: 344,
                    borderRadius: "28px",
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </Box>

              {/* Right Text Section */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontWeight={600}
                  color="#081735"
                  mb={1}
                  fontSize={18}
                >
                  {item.title}
                </Typography>

                <Box display="flex" alignItems="center" mb={1}>
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: "#FFB400", fontSize: 20 }} />
                  ))}
                </Box>

                <Typography fontSize={20} fontWeight={500} color="#081735">
                  {item.text}
                </Typography>
                <Typography
                  fontSize={20}
                  fontWeight={500}
                  color="#081735"
                  mb={2}
                  lineHeight={1.8}
                >
                  {item.text}
                </Typography>
                <Typography fontSize={14} color="#9E9E9E" mb={4}>
                  {item.name}, {item.job}
                </Typography>

                <Stack direction="row" spacing={3} alignItems="center" mt={2}>
                  <IconButton
                    className="swiper-button-prev"
                    sx={{
                      border: "2px solid #3F5BF6",
                      color: "#3F5BF6",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft:"52px",
                      "&:hover": {
                        backgroundColor: "#3F5BF6",
                        color: "#fff",
                      },
                    }}
                  ></IconButton>

                  <IconButton
                    className="swiper-button-next"
                    sx={{
                      border: "2px solid #3F5BF6",
                      color: "#3F5BF6",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": {
                        backgroundColor: "#3F5BF6",
                        color: "#fff",
                      },
                    }}
                  ></IconButton>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default TestimonialCarousel;
