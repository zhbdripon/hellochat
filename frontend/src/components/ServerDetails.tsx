import { Box } from "@mui/material";

import useServerStore from "../store/useServerStore";
import ChannelCategories from "./ChannelCategories";
import ServerHeader from "./ServerHeader";
import ServerQuickActionMenu from "./ServerQuickActionMenu";

const ServerDetails = () => {
  const server = useServerStore((s) => s.selectedServer);

  if (!server || !server.id) return null;

  return (
    <Box className="h-full">
      <div className="p-2 h-calc-minus-48">
        <ServerHeader serverName={server.name} />
        <ChannelCategories serverId={server.id} />
      </div>
      <ServerQuickActionMenu />
    </Box>
  );
};

export default ServerDetails;
