import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

import useServerStore from "../store";
import ChannelList from "./ChannelList";

const ServerDetails = () => {
  const server = useServerStore((s) => s.selectedServer);

  if (!server) return null;

  return (
    <Box>
      <ServerHeader serverName={server.name} />
      <ChannelList serverId={server.id} />
    </Box>
  );
};

export default ServerDetails;

interface ServerHeaderProps {
  serverName: string;
}

const ServerHeader = ({ serverName }: ServerHeaderProps) => {
  const theme = useTheme();
  const isDarkMode = theme?.palette.mode === "dark";
  return (
    <Box
      className={`
      h-12
      flex
      items-center
      justify-center
      border-b-2
      ${isDarkMode ? "border-separatorDark" : "border-separatorLight"}`}
    >
      <Typography level="subtitle1">{serverName}</Typography>
    </Box>
  );
};