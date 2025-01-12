import { createContext, ReactNode, useState } from "react";
import { Server } from "../hook/useServer";

interface ServerAddContext {
  step: number;
  showModal: boolean;
  moveNext: () => void;
  movePrev: () => void;
  openModal: () => void;
  closeModal: () => void;
  newServerData: Server;
  addNewServerData: (updates: object) => void;
}

interface ServerAddProviderProps {
  children: ReactNode;
}

type ServerAddContextType = ServerAddContext | null;

export const ServerAddContext = createContext<ServerAddContextType>(null);

const ServerAddProvider = ({ children }: ServerAddProviderProps) => {
  const [step, setStep] = useState<number>(0);
  const [newServerData, setNewServerData] = useState<Server>({} as Server);
  const [showModal, setShowModal] = useState<boolean>(false);

  const moveNext = () => setStep((step) => step + 1);
  const movePrev = () => setStep((step) => step - 1);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const addNewServerData = (updates: object) => {
    setNewServerData({
      ...newServerData,
      ...updates,
    });
  };

  return (
    <ServerAddContext.Provider
      value={{
        step,
        showModal,
        moveNext,
        movePrev,
        openModal,
        closeModal,
        newServerData,
        addNewServerData,
      }}
    >
      {children}
    </ServerAddContext.Provider>
  );
};

export default ServerAddProvider;
