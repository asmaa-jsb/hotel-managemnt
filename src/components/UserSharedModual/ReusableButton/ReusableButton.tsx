import React from "react";
import { Button } from "@mui/material";

interface ReusableButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
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
      }}
    >
      {label}
    </Button>
  );
};

export default ReusableButton;
