import { Box, Container, Grid, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#fff", py: 6, borderTop: "1px solid #f0f0f0" }}>
      <Container maxWidth="xl" sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Grid container spacing={10}>
          <Grid size={{xs:12, sm:6, md:3} } >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#3F5BF6",
                display: "inline",
              }}
            >
              Stay
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "inline",
                color: "#081735",
              }}
            >
              cation.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mt={2}
              maxWidth={200}
            >
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* For Beginners */}
          <Grid size={{xs:12, sm:6, md:3} }>
            <Typography fontWeight="bold" color="#081735" mb={2}>
              For Beginners
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                New Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Booking a Room
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use Payments
              </Typography>
            </Stack>
          </Grid>

          {/* Explore Us */}
          <Grid size={{xs:12, sm:6, md:3} }>
            <Typography fontWeight="bold" color="#081735" mb={2}>
              Explore Us
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Our Careers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Privacy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Terms & Conditions
              </Typography>
            </Stack>
          </Grid>

          {/* Connect Us */}
          <Grid size={{xs:12, sm:6, md:3} }>
            <Typography fontWeight="bold" color="#081735" mb={2}>
              Connect Us
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                support@staycation.id
              </Typography>
              <Typography variant="body2" color="text.secondary">
                021 - 2208 - 1996
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Staycation, Kemang, Jakarta
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={6}
        >
          Copyright 2019 • All rights reserved • Staycation
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
