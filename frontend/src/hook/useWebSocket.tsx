import { useContext, useEffect } from "react";
import { WebSocketContext } from "../context/webSocketContext";
import { Message } from "./useMessage";

export const WS_EVENTS = {
  SERVER_MESSAGE: "server_message",
  SERVER_JOIN: "server_join",
};

type WSEventEnum = "server_message";

export interface WSEventData {
  type: WSEventEnum;
  message: Message;
}

interface ServerMessageParam {
  channelId: number;
  onReceiveNewMessage: (message: Message) => void;
}

type UseWSParams = ServerMessageParam | undefined;

interface UseWebSocketInterface {
  socket: WebSocket | null;
  sendMessage: (message: object) => void;
  isConnected: boolean;
}

// Custom hook to use the WebSocket context
const useWebSocket = (params: UseWSParams): UseWebSocketInterface => {
  const { socket, isConnected } = useContext(WebSocketContext)!;

  useEffect(() => {
    if (socket) {
      socket.onmessage = (e: MessageEvent) => {
        handleSocketMessage(e);
      };
    }
  }, []);

  const handleSocketMessage = (e: MessageEvent) => {
    if (!params) {
      throw Error("Provide WS event handler arguments");
    }

    const { channelId, onReceiveNewMessage } = params;

    const receivedData: WSEventData = JSON.parse(e.data);
    const actionType = receivedData?.type;
    const message = receivedData?.message;

    if (actionType === WS_EVENTS.SERVER_MESSAGE) {
      if (message.channel_id === String(channelId)) {
        onReceiveNewMessage(message);
      }
    }
  };

  const sendMessage = (message: object) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  return { socket, sendMessage, isConnected };
};

export default useWebSocket;
