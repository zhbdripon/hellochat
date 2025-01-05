import React, { createContext, ReactNode, useEffect, useState } from "react";

type WebSocketContextType = WebSocket | null;

export const WebSocketContext = createContext<WebSocketContextType>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connection = async () => {
      if (socket) {
        return;
      }
      const ws = await new WebSocket(
        `ws://172.28.28.49:8080/join?token=${localStorage.getItem("access")}`
      );
      setSocket(ws);
    };

    connection();

    return () => socket?.close();
  }, [socket]);

  if (!socket) return;

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
