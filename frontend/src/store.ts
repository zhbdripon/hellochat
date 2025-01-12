import { create } from "zustand";
import { Channel } from "./hook/useChannel";
import { Server } from "./hook/useServer";
export interface ServerStore {
  selectedServer: Server | null;
  selectedChannel: Channel | null;
  setSelectedServer: (server: Server) => void;
  setSelectedChannel: (channel: Channel) => void;
}

const useServerStore = create<ServerStore>((set) => ({
  selectedServer: null,
  selectedChannel: null,
  setSelectedServer: (server: Server) => set({ selectedServer: server }),
  setSelectedChannel: (channel: Channel) => set({ selectedChannel: channel }),
}));

export default useServerStore;
