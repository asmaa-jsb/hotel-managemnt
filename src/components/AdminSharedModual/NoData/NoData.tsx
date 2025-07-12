import { noDataImage } from "@/assets/Images";
import { Box, Typography } from "@mui/material";

const NoData = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 4,
      }}
    >
      <img
        src={noDataImage}
        alt="no data image"
        style={{
          maxWidth: "150px",
          marginBottom: "1rem",
        }}
      />
      <Typography
        component="h1"
        sx={{
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "#555",
        }}
      >
        No Data Available
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: "0.9rem",
          color: "#888",
          mt: 0.5,
        }}
      >
        Please check back later or try a different query.
      </Typography>
    </Box>
  );
};

export default NoData;
