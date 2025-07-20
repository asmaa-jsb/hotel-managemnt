import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface AuthSubmitButtonProps {
  label: string;
  onClick?: () => void;
  type?: "submit" | "button";
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  sx?: object;
  loading?: boolean; 
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  label,
  onClick,
  type = "submit",
  fullWidth = true,
  disabled = false,
  variant = "contained",
  sx = {},
  loading = false, 
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      variant={variant}
      sx={{
        width: "100%",
        minHeight: "48px",
        backgroundColor: "#3b5bfd",
        color: "#fff",
        textTransform: "none",
        borderRadius: "8px",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        fontWeight: "500",
        fontSize: "16px",
        "&:hover": {
          backgroundColor: "#2e4fe1",
        },
        ...sx,
      }}
    >
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CircularProgress size={18} color="inherit" />
          Sending...
        </span>
      ) : (
        label
      )}
    </Button>
  );
};

export default AuthSubmitButton;
