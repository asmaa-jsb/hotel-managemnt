import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@emotion/react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

const ReusableAlertModal: React.FC<Props> = ({
  open,
  onClose,
  title,
  message,
  confirmText = "OK",
  onConfirm,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          px: 3,
          py: 3,
          bgcolor: "#fff",
          textAlign: "center",
          boxShadow: 6,
          position: "relative",
          animation: `${shake} 0.4s ease`,
           zIndex: 1000,
        },
      }}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0,0,0,0.3)" },
      }}
    >

      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <Box mb={1}>
        <WarningAmberRoundedIcon
          sx={{ fontSize: 50, color: "hotpink", mb: 1 }}
        />
      </Box>

      <DialogTitle sx={{ fontSize: 20, fontWeight: 600, p: 0 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography fontSize={14} color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: "#0F7AD3",
            color: "#fff",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#085a9d",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableAlertModal;
