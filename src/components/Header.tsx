import { Box, Button, Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <Container maxWidth="lg" className="Header-bg">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={2}
        py={4}
        my={3}
      >
        <Box>
          <Typography variant="h5">Rooms Table Details</Typography>
          <Typography variant="body1">You can check all details</Typography>
        </Box>
        <Box>
          <Button
            className="Primary-color"
            variant="contained"
            sx={{ py: 1.5, px: 5, textTransform: "none" }}
          >
            Add New Room
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
