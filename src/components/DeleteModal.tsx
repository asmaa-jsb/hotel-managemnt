import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import deleteImg from "@/assets/Images/delete.png";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
};

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete This Item?",
  description = "Are you sure you want to delete this item? If you are sure, just click on delete.",
}: ConfirmModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          p: 3,
          textAlign: "center",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#CC0000",
          borderRadius: "25px",
          border: "1px solid #CC0000",
          margin: "5px",
          width: "27px",
          height: "27px",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={deleteImg}
            alt="delete-icon"
            style={{ width: "100px", height: "100px" }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        {/* Description */}
        <Typography color="text.secondary" fontSize={14} mb={3}>
          {description}
        </Typography>

        {onConfirm && (
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            fullWidth
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Delete
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
