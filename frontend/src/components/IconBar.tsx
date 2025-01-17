import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box, Tooltip, useColorScheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import ServerAddProvider from "../context/ServerAddContext";
import useDarkMode from "../hook/useDarkMode";
import useServer, { Server } from "../hook/useServer";
import useWebSocket, { WS_EVENTS } from "../hook/useWebSocket";
import useServerStore from "../store/useServerStore";
import { stringToColor } from "../utils";
import ServerAdd from "./ServerAdd";

const IconBar = () => {
  const { setMode } = useColorScheme();
  const { sendMessage } = useWebSocket(undefined);
  const isDarkMode = useDarkMode();
  const setSelectedServer = useServerStore((s) => s.setSelectedServer);
  const selectedServer = useServerStore((s) => s.selectedServer);

  const { data: serverData, isLoading, error } = useServer();
  const servers = serverData?.results;

  const connectServersWithWebSocket = (servers: Server[]) => {
    servers.forEach((server) => {
      console.log("adding chatroom to websocket : ", server);
      sendMessage({
        type: WS_EVENTS.SERVER_JOIN,
        server_id: server.id,
      });
    });
  };

  useEffect(() => {
    if (servers) {
      connectServersWithWebSocket(servers);
    }
  }, [servers]);

  useEffect(() => {
    if (!selectedServer && servers) {
      setSelectedServer(servers[0]);
    }
  }, [selectedServer, servers]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !serverData) return null;

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 56,
        height: 56,
      },
      children: name[0].toUpperCase(),
    };
  }

  return (
    <Box
      className={`w-[72px] h-screen flex flex-row justify-center py-5 
        ${isDarkMode ? "bg-iconBarDark" : "bg-iconBarLight"}`}
    >
      <Stack direction="column">
        <Stack direction="column" spacing={2} className="h-[calc(100%-10px)]">
          {servers?.map((server) => (
            <Tooltip title={server.name} placement="right" key={server.id}>
              <Avatar
                className={
                  server.id === selectedServer?.id
                    ? "border-4 border-red-600"
                    : ""
                }
                variant="rounded"
                {...stringAvatar(server.name)}
                onClick={() => {
                  setSelectedServer(server);
                }}
              />
            </Tooltip>
          ))}
          <ServerAddProvider>
            <ServerAdd />
          </ServerAddProvider>
        </Stack>
        <Tooltip title="Toggle Dark Mode" placement="right">
          <WbSunnyIcon
            onClick={() => {
              setMode(isDarkMode ? "light" : "dark");
            }}
            className="cursor-pointer"
            sx={{ width: "100%" }}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default IconBar;
