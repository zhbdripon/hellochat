import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const wsProtocol = import.meta.env.VITE_WS_PROTOCOL;
const backendHost = import.meta.env.VITE_BACKEND_HOST;
const backendPort = import.meta.env.VITE_WS_PORT;
const wsURL = `${wsProtocol}://${backendHost}:${backendPort}/join`;

interface WebSocketContextInterface {
  socket: WebSocket | null;
  isConnected: boolean;
}

export const WebSocketContext = createContext<WebSocketContextInterface | null>(
  null
);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const retryCountRef = useRef(0); // Track retry attempts

  const maxRetries = 100;
  const retryDelay = 2000;

  const connect = () => {
    if (
      socketRef.current &&
      socketRef.current.readyState !== WebSocket.CLOSED
    ) {
      return;
    }

    const ws = new WebSocket(wsURL);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      retryCountRef.current = 0;
      socketRef.current = ws;
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);

      if (retryCountRef.current < maxRetries) {
        retryCountRef.current += 1;
        const maxRetryDelayTime = 60_000;
        const delay = Math.min(
          retryDelay * retryCountRef.current,
          maxRetryDelayTime
        );

        console.log(`Reconnecting in ${delay / 1000}s...`);
        setTimeout(connect, Math.min(delay, 60000));
      } else {
        console.error("Max retries reached. Unable to reconnect.");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.close();
    };
  };

  useEffect(() => {
    connect();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log(
          "Tab refocused: resetting retry counter and reconnecting..."
        );
        retryCountRef.current = 0;
        connect();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      socketRef.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ socket: socketRef.current, isConnected }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
