interface WebSocketParams {
  channelId: number;
  serverId: number;
  token: string;
}

const useWebSocket = ({
  channelId,
  serverId,
  token,
  onNewMessageReceived,
}: WebSocketParams) => {
  const ws = new WebSocket(
    `ws://172.28.28.49:8080/server/${serverId}/channel/${channelId}?token=${token}`
  );

  ws.onopen = () => {
    console.log("Connected");
  };

  ws.onmessage = (e) => {
    const received = JSON.parse(e.data);
    onNewMessageReceived(received.message);
    console.log(e.data);
  };

  ws.onclose = () => {
    console.log("Disconnected");
  };

  ws.onerror = (e) => {
    console.log(e);
  };

  return ws;
};

export default useWebSocket;
