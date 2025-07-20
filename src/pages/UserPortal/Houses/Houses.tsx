import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import house1 from "@/assets/Images/Housa1.png";
import house2 from "@/assets/Images/Housa2.png";
import house3 from "@/assets/Images/Housa3.png";
import house4 from "@/assets/Images/Housa4.png";

const houseData = [
  { img: house1, title: "Tabby Town", location: "Gunung Batu, Indonesia" },
  { img: house2, title: "Sunny Vale", location: "Yogyakarta, Indonesia" },
  { img: house3, title: "Cactus Garden", location: "Bandung, Indonesia" },
  { img: house4, title: "Ocean Cliff", location: "Bali, Indonesia" },
];

const Houses = () => {
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
        Houses with beauty backyard
      </Typography>

      <Grid container spacing={3}>
        {houseData.map((house, index) => (
          <Grid key={index} size={{ md: 3, xs: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box sx={{ textAlign: "center", position: "relative" }}>
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

                {index === 0 && (
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
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Houses;
