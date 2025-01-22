import React, { createContext, useState } from "react";
import { ChannelPayload } from "../hook/useChannelAdd";

interface ChannelAddContext {
  newChannelData: ChannelPayload;
  setNewChannelData: (channel: ChannelPayload) => void;
  resetNewChannelData: () => void;
}

export type ChannelAddContextType = ChannelAddContext | null;

const ChannelAddContext = createContext<ChannelAddContextType>(null);

export const ChannelAddProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newChannelData, setNewChannelData] = useState<ChannelPayload>(
    {} as ChannelPayload
  );

  const resetNewChannelData = () => setNewChannelData({} as ChannelPayload);

  return (
    <ChannelAddContext.Provider
      value={{
        newChannelData,
        setNewChannelData,
        resetNewChannelData,
      }}
    >
      {children}
    </ChannelAddContext.Provider>
  );
};

export default ChannelAddContext;
