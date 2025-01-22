import { useContext } from "react";
import ChannelAddContext from "../context/ChannelAddContext";

export const useChannelAddState = () => {
  const context = useContext(ChannelAddContext);
  if (!context) {
    throw new Error(
      "useChannelAddState must be used within a ChannelAddProvider"
    );
  }
  return context;
};
