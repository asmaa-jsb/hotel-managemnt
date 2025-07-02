import React from "react";
import { Button } from "@mui/material";

interface AuthSubmitButtonProps {
  label: string;
  onClick?: () => void;
  type?: "submit" | "button";
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  sx?: object; // يسمح بتخصيص إضافي عند الحاجة
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  label,
  onClick,
  type = "submit",
  fullWidth = true,
  disabled = false,
  variant = "contained",
  sx = {},
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      variant={variant}
      sx={{
        width: "100%", // تأكيد الطول الكامل
        minHeight: "48px", // ارتفاع مريح للزر
        backgroundColor: "#3b5bfd", // اللون الأساسي
        color: "#fff", // لون النص
        textTransform: "none", // يمنع تحويل الحروف لـ uppercase
        borderRadius: "8px", // حواف ناعمة
        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)", // ظل خفيف
        fontWeight: "500",
        fontSize: "16px",
        "&:hover": {
          backgroundColor: "#2e4fe1", // لون عند التمرير
        },
        ...sx, // تخصيص إضافي عند الاستخدام
      }}
    >
      {label}
    </Button>
  );
};

export default AuthSubmitButton;
