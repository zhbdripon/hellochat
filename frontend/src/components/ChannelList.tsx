import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import useChannel from "../hook/useChannel";
import TagIcon from "@mui/icons-material/Tag";
import useServerStore from "../store";

interface Props {
  serverId: number;
}

const ChannelList = ({ serverId }: Props) => {
  const setSelectedChannel = useServerStore((s) => s.setSelectedChannel);
  const { data, isLoading, error } = useChannel({ serverId });
  const channels = data?.results;

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
            <ListItemButton>
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
