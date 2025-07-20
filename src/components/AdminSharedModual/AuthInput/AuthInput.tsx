import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  IconButton,
  Typography,
  InputBase,
 type InputProps as MuiInputProps
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
  disabled?: boolean;
  defaultValue?: string;
  InputProps?: MuiInputProps;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type = "text",
  placeholder = "",
  error,
  helperText,
  register,
  disabled = false,
  defaultValue = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && !showPassword ? "password" : "text";

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
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

      <Box
        sx={{
          backgroundColor: disabled ? "#E2E8F0" : "#F5F6FA",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <InputBase
          fullWidth
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          sx={{
            width: "100%",
            fontSize: "14px",
            color: disabled ? "#A0AEC0" : "#000",
            "::placeholder": { color: "#A0AEC0" },
          }}
          {...register}
        />

        {isPasswordField && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
      </Box>

      {error && (
        <Typography sx={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default AuthInput;
