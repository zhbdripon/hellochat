import { useContext } from "react";
import { ConfirmationModalContext } from "../context/ConfirmationModalContext";

type ConfirmationModalContextType = {
  showModal: (message: string, onConfirm: () => void) => void;
  hideModal: () => void;
};

export const useConfirmationModal = (): ConfirmationModalContextType => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      "useConfirmationModal must be used within a ConfirmationModalProvider"
    );
  }
  return context;
};
