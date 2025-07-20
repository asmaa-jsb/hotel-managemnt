import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { SxProps } from "@mui/system";

interface ReusableButtonProps {
  label?: string;
  to?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  padding?: string;
  type?:string;
  sx?: SxProps; // ✅ دعم sx مخصص
  onClick?:()=>void
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  to,
  fullWidth = false,
  disabled = false,
  padding = "8px 35px",
  sx = {}, 
  onClick= ()=>{},
  type,
}) => {
  const ButtonComponent: React.ElementType = to ? RouterLink : 'button';

  return (
    <Button
      type={to ? undefined : type} 
      component={ButtonComponent}
      to={to}
      fullWidth={fullWidth}
      disabled={disabled}
      variant="contained"
      onClick={onClick}
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
        ...sx, 
      }}
    >
      {label}
      
    </Button>
  );
};

export default ReusableButton;