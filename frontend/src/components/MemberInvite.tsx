import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useBatchServerInvitation from "../hook/useBatchServerInvitation";
import useNotification from "../hook/useNotification";
import useServerStore from "../store/useServerStore";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const MemberInvite: React.FC = () => {
  const { inviteModalOpen, hideInviteModal, selectedServer } = useServerStore();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState<string>("");
  const [currentEmailIsValid, setCurrentEmailValid] = useState(false);
  const [emailList, setEmailList] = useState<string[]>([]);
  const mutation = useBatchServerInvitation({
    onSuccess: () => {
      hideInviteModal();
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validateEmail(email)) {
        setEmailList((prev) => [...prev, email]);
        setEmail("");
        setCurrentEmailValid(false);
      } else {
        showNotification("Invalid email");
        setEmail("");
      }
    }
  };

  const handleDelete = (emailToDelete: string) => {
    setEmailList((prev) => prev.filter((item) => item !== emailToDelete));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInvitationSend = () => {
    const emails = currentEmailIsValid ? [...emailList, email] : emailList;

    if (selectedServer && selectedServer.id && emails.length > 0) {
      mutation.mutate({
        server: selectedServer.id,
        invitee_emails: emails,
      });
    }
  };

  return (
    <Modal
      open={inviteModalOpen}
      onClose={hideInviteModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" autoComplete="off" sx={style}>
        <Typography variant="h6" gutterBottom>
          Invite Members
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email-input">Email address</InputLabel>
          <Input
            id="email-input"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setCurrentEmailValid(validateEmail(e.target.value));
            }}
            onKeyDown={handleKeyDown}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            Press Enter to quickly add multiple emails
          </FormHelperText>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {emailList.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleDelete(item)}
              color="primary"
            />
          ))}
        </Box>
        <Button
          aria-label="Invite"
          color="primary"
          disabled={emailList.length < 1 && !currentEmailIsValid}
          variant="contained"
          sx={{ mt: 2, width: "100%" }}
          onClick={handleInvitationSend}
          endIcon={<SendIcon fontSize="small" />}
        >
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default MemberInvite;
