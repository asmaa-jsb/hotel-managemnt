import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface ReusableButtonProps {
  label: string;
  to: string; // 📌 مطلوب لأنه لازم يكون لينك دائمًا
  fullWidth?: boolean;
  disabled?: boolean;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  to,
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <Button
      component={RouterLink}
      to={to}
      fullWidth={fullWidth}
      disabled={disabled}
      variant="contained"
      sx={{
        background: "rgba(50, 82, 223, 1)",
        color: "#fff",
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "6px",
        boxShadow: "0px 4px 10px rgba(50, 82, 223, 0.3)",
        padding: "8px 35px",
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
};

export default ReusableButton;
