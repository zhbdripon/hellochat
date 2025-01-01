import { create } from 'zustand'

export interface Server {
    id: number;
    name: string;
}

export interface ServerStore {
    selectedServer: Server | null;
    setSelectedServer: (server: Server) => void;
}

const useServerStore = create<ServerStore>((set) => ({
    selectedServer: null,
    setSelectedServer: (server: Server) => set({ selectedServer: server }),
}))

export default useServerStore;