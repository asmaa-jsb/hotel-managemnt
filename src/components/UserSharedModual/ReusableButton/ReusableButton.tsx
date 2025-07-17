import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface ReusableButtonProps {
  label?: string;
  to?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  padding?: string;
  type?: "button" | "submit" | "reset"; // restrict types
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  to,
  fullWidth = false,
  disabled = false,
  padding = "8px 35px",
  type = "button",
}) => {
  // If `to` exists, render as link, else as button
  if (to) {
    return (
      <Button
        component={RouterLink}
        to={to}
        fullWidth={fullWidth}
        disabled={disabled}
        type={type} // <== For links, `type` isn't relevant, but it's okay to pass
        sx={{
          background: "rgba(50, 82, 223, 1)",
          color: "#fff",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "6px",
          boxShadow: "0px 4px 10px rgba(50, 82, 223, 0.3)",
          padding: padding,
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#1a34a0",
          },
          letterSpacing: ".1rem",
          textDecoration: "none",
        }}
      >
        {label}
      </Button>
    );
  } else {
    // Render as normal button
    return (
      <Button
        type={type}
        fullWidth={fullWidth}
        disabled={disabled}
        sx={{
          background: "rgba(50, 82, 223, 1)",
          color: "#fff",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "6px",
          boxShadow: "0px 4px 10px rgba(50, 82, 223, 0.3)",
          padding: padding,
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#1a34a0",
          },
          letterSpacing: ".1rem",
        }}
      >
        {label}
      </Button>
    );
  }
};

export default ReusableButton;