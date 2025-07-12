import { Modal, Box, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ReusableModal = ({ open, onClose, children }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="custom-modal-box">
        <div className="modal-header">
          <IconButton onClick={onClose}>
            <AiOutlineClose size={24} />
          </IconButton>
        </div>
        <div className="modal-content">{children}</div>
      </Box>
    </Modal>
  );
};

export default ReusableModal;
