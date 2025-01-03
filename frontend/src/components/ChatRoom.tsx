import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";

import useMessage, { Message } from "../hook/useMessage";
import useWebSocket from "../hook/useWebSocket";

interface Props {
  channelId: number;
  serverId: number;
}

const ChatRoom = ({ serverId, channelId }: Props) => {
  const messageContainerRef = useRef<HTMLElement>();
  const inputRef = useRef<HTMLInputElement>();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useMessage({ channelId: channelId });
  const messages = data?.results;

  const ws = useWebSocket({
    channelId: channelId,
    serverId: serverId,
    token: localStorage.getItem("access") || "",
    onNewMessageReceived: (message: Message) => {
      queryClient.setQueryData(["messages", channelId], (oldData: any) => {
        const messageExist = (oldData.results || []).some(
          (m) => m.id === message.id
        );

        if (messageExist) {
          return oldData;
        }

        return {
          ...oldData,
          results: [message, ...oldData.results],
        };
      });
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        ws.send(inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (messageContainerRef && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!serverId || !channelId || !messages) return null;

  return (
    <Box className="flex flex-col justify-end h-full p-4">
      <Box className="overflow-y-auto h-[90%]" ref={messageContainerRef}>
        {[...messages].reverse().map((message) => (
          <Box key={message.id} className="bg-gray-200 p-2 rounded-lg mb-2">
            <p className="text-sm font-semibold">
              {message.author} {message.id}
            </p>
            <p>{message.content}</p>
          </Box>
        ))}
      </Box>
      <TextField
        inputRef={inputRef}
        className="w-[98%]"
        id="outlined-required"
        placeholder="Type your message..."
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default ChatRoom;
