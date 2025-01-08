import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";

import useDarkMode from "../hook/useDarkMode";
import useServerStore from "../store";
import ChannelList from "./ChannelList";
import ServerUser from "./ServerUser";

const ServerDetails = () => {
  const server = useServerStore((s) => s.selectedServer);

  if (!server) return null;

  return (
    <Box className="h-full">
      <div className="p-2 h-calc-minus-48">
        <ServerHeader serverName={server.name} />
        <ChannelList serverId={server.id} />
      </div>
      <ServerUser />
    </Box>
  );
};

export default ServerDetails;

interface ServerHeaderProps {
  serverName: string;
}

const ServerHeader = ({ serverName }: ServerHeaderProps) => {
  const isDarkMode = useDarkMode();
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
