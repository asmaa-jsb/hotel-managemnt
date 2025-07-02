import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface AuthInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  register: any;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type = "text",
  name,
  placeholder = "",
  required = false,
  error,
  helperText,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      {/* Label فوق */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          color: "#172B4D",
          marginBottom: "8px",
        }}
      >
        {label}
      </Typography>

      {/* Input مخصص */}
      <Box
        sx={{
          backgroundColor: "#F5F6FA",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <InputBase
          fullWidth
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          sx={{
            width: "100%",
            fontSize: "14px",
            color: "#000",
            "::placeholder": { color: "#A0AEC0" },
          }}
          {...register}
        />

        {/* إظهار/إخفاء الباسورد */}
        {type === "password" && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Typography sx={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default AuthInput;
