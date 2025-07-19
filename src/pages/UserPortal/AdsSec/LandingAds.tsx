import { Box, Container, Grid, Typography } from "@mui/material";

import hotel1 from "@/assets/Images/hotel1.png";
import hotel2 from "@/assets/Images/hotel2.png";
import hotel3 from "@/assets/Images/hotel3.png";
import hotel4 from "@/assets/Images/hotel4.png";

const houseData = [
  { img: hotel1, title: "Green Park", location: "Tangerang, Indonesia" },
  { img: hotel2, title: "Podo Wae", location: "Madiun, Indonesia" },
  { img: hotel3, title: "Silver Rain", location: "Bandung, Indonesia" },
  { img: hotel4, title: "Cash Ville", location: "Kemang, Indonesia" },
];

const LandingAds = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ maxWidth: "1400px", mx: "auto", my: { lg: 10, sm: 4, xs: 2 } }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        className="Secondary-color"
      >
        Hotels with large living room
      </Typography>

      <Grid container spacing={3}>
        {houseData.map((house, index) => (
          <Grid key={index} size={{ md: 3, xs: 12 }}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={house.img}
                alt={house.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 1.5,
                }}
              />

              {index === 3 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#fff",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: 12,
                    fontWeight: "bold",
                    bgcolor: "hotpink",
                  }}
                >
                  Popular
                </Box>
              )}

              <Typography variant="h6" fontWeight="bold">
                {house.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {house.location}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingAds;
