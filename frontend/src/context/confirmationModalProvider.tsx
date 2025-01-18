import React, { createContext, useState, useCallback, ReactNode } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

type ModalConfig = {
  isVisible: boolean;
  message: string;
  onConfirm?: () => void;
};

type ConfirmationModalContextType = {
  showModal: (message: string, onConfirm: () => void) => void;
  hideModal: () => void;
};

export const ConfirmationModalContext = createContext<
  ConfirmationModalContextType | undefined
>(undefined);

type ConfirmationModalProviderProps = {
  children: ReactNode;
};

export const ConfirmationModalProvider: React.FC<
  ConfirmationModalProviderProps
> = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isVisible: false,
    message: "",
  });

  const showModal = useCallback((message: string, onConfirm: () => void) => {
    setModalConfig({ isVisible: true, message, onConfirm });
  }, []);

  const hideModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (modalConfig.onConfirm) modalConfig.onConfirm();
    hideModal();
  }, [modalConfig.onConfirm, hideModal]);

  return (
    <ConfirmationModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <ConfirmationModal
        isVisible={modalConfig.isVisible}
        message={modalConfig.message}
        onConfirm={handleConfirm}
        onCancel={hideModal}
      />
    </ConfirmationModalContext.Provider>
  );
};
