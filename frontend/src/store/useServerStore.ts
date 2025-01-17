import { create } from "zustand";
import { Channel } from "../hook/useChannel";
import { Server } from "../hook/useServer";

export interface ServerStore {
  selectedServer: Server | null;
  selectedChannel: Channel | null;
  serverMenuOpen: boolean;
  inviteModalOpen: boolean;
  setSelectedServer: (server: Server) => void;
  setSelectedChannel: (channel: Channel) => void;
  showServerMenu: () => void;
  hideServerMenu: () => void;
  showInviteModal: () => void;
  hideInviteModal: () => void;
}

const useServerStore = create<ServerStore>((set) => ({
  selectedServer: null,
  selectedChannel: null,
  serverMenuOpen: false,
  inviteModalOpen: false,
  setSelectedServer: (server: Server) => set({ selectedServer: server }),
  setSelectedChannel: (channel: Channel) => set({ selectedChannel: channel }),
  showServerMenu: () => set({ serverMenuOpen: true }),
  hideServerMenu: () => set({ serverMenuOpen: false }),
  showInviteModal: () => set({ inviteModalOpen: true }),
  hideInviteModal: () => set({ inviteModalOpen: false }),
}));

export default useServerStore;
