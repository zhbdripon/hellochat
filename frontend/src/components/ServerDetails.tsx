import { Box } from "@mui/material";

import useServerStore from "../store/useServerStore";
import ChannelList from "./ChannelList";
import ServerUserTile from "./ServerUserTile";
import ServerHeader from "./ServerHeader";

const ServerDetails = () => {
  const server = useServerStore((s) => s.selectedServer);

  if (!server) return null;

  return (
    <Box className="h-full">
      <div className="p-2 h-calc-minus-48">
        <ServerHeader serverName={server.name} />
        <ChannelList serverId={server.id} />
      </div>
      <ServerUserTile />
    </Box>
  );
};

export default ServerDetails;
