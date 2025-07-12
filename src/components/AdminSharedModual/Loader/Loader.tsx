import React from "react";
import { Box, Typography } from "@mui/material";

interface HotelLoaderProps {
  mode?: "search" | "filter" | "initial";
  model?: string;
}

export const Loader: React.FC<HotelLoaderProps> = ({
  mode = "initial",
  model = "data",
}) => {
  const windows = Array.from({ length: 25 }, (_, i) => (
    <Box
      className="window"
      key={i}
      sx={{
        animationDelay: `${(i + 1) / 10}s`,
        animationDuration: `${(i + 1) / 10 + 1}s`,
      }}
    />
  ));

  const getMessage = () => {
    const target = model.toLowerCase();
    switch (mode) {
      case "search":
        return `Searching for available ${target}...`;
      case "filter":
        return `Filtering ${target} based on your selection...`;
      case "initial":
      default:
        return `Loading ${target}...`;
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2,
      }}
    >
      <Box className="loader" sx={{ margin: "0 auto" }}>
        {windows}
        <Box className="door" />
        <Box className="hotel-sign">
          <span>H</span>
          <span>O</span>
          <span>T</span>
          <span>E</span>
          <span>L</span>
        </Box>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ mt: 1, color: "rgba(32, 63, 199, 1)" }}
      >
        {getMessage()}
      </Typography>
    </Box>
  );
};
