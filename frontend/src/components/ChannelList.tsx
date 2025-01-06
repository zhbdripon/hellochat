import TagIcon from "@mui/icons-material/Tag";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import useChannel from "../hook/useChannel";
import useServerStore from "../store";

interface Props {
  serverId: number;
}

const ChannelList = ({ serverId }: Props) => {
  const setSelectedChannel = useServerStore((s) => s.setSelectedChannel);
  const selectedServer = useServerStore((s) => s.selectedServer);
  const selectedChannel = useServerStore((s) => s.selectedChannel);
  const { data, isLoading, error } = useChannel({ serverId });
  const channels = data?.results;

  useEffect(() => {
    if (selectedServer && channels) {
      setSelectedChannel(channels[0]);
    }
  }, [selectedServer, channels]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) return null;

  return (
    <List>
      {channels?.map((channel) => {
        return (
          <ListItem
            key={channel.id}
            disablePadding
            onClick={() => setSelectedChannel(channel)}
          >
            <ListItemButton selected={selectedChannel?.id === channel.id}>
              <ListItemIcon
                sx={{ minWidth: 40, display: "flex", alignItems: "center" }}
              >
                <TagIcon />
                <img src={channel.icon} alt="" className="w-4 h-4 m-2" />
                {"|"}
              </ListItemIcon>
              <ListItemText primary={channel.name} className="m-2" />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ChannelList;
