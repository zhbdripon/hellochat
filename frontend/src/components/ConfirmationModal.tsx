import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

type ConfirmationModalProps = {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = React.memo(
  ({ isVisible, message, onConfirm, onCancel }) => {
    return (
      <Modal
        open={isVisible}
        onClose={onCancel}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 300,
          }}
        >
          <Typography
            id="confirmation-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Confirmation
          </Typography>
          <Typography
            id="confirmation-modal-description"
            variant="body1"
            sx={{ mb: 3 }}
          >
            {message}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onConfirm} color="primary">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
);

export default ConfirmationModal;
