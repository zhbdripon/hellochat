import { useTheme } from "@emotion/react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box, Tooltip, useColorScheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import useServer from "../hook/useServer";
import useWebSocket, { WS_EVENTS } from "../hook/useWebSocket";
import useServerStore, { Server } from "../store";
import { stringToColor } from "../utils";

const IconBar = () => {
  const theme = useTheme();
  const { setMode } = useColorScheme();
  const socket = useWebSocket();
  const isDarkMode = theme?.palette.mode === "dark";
  const setSelectedServer = useServerStore((s) => s.setSelectedServer);
  const selectedServer = useServerStore((s) => s.selectedServer);

  const { data: serverData, isLoading, error } = useServer();
  const servers = serverData?.results;

  const connectServersWithWebSocket = (servers: Server[], socket) => {
    servers.forEach((server) => {
      console.log("adding server : ", server);
      socket?.send(
        JSON.stringify({
          type: WS_EVENTS.SERVER_JOIN,
          server_id: server.id,
        })
      );
    });
  };

  useEffect(() => {
    if (servers && socket) {
      connectServersWithWebSocket(servers, socket);
    }
  }, [servers, socket]);

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
        </Stack>
        <Tooltip title="Toggle Dark Mode" placement="right">
          <WbSunnyIcon
            onClick={() => {
              setMode(isDarkMode ? "light" : "dark");
            }}
            className="cursor-pointer"
          />
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default IconBar;
