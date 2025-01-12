import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import { createContext, ReactNode, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ProviderProps {
  children: ReactNode;
}

interface NotificationContext {
  showNotification: (message: string, action?: ReactNode) => void;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const NotificationContext = createContext<NotificationContext | null>(
  null
);

const NotificationProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [additionalAction, setAdditionalAction] = useState<ReactNode | null>(
    null
  );

  const showNotification = (message: string, action?: ReactNode) => {
    setAdditionalAction(action);
    setMessage(message);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const action = (
    <React.Fragment>
      {additionalAction}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
