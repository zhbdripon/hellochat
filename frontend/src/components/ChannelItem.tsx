import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TagIcon from "@mui/icons-material/Tag";
import useServerStore from "../store/useServerStore";
import { Channel } from "../hook/useChannel";

interface Props {
  channel: Channel;
}

const ChannelItem = ({ channel }: Props) => {
  const selectedChannel = useServerStore((s) => s.selectedChannel);
  const setSelectedChannel = useServerStore((s) => s.setSelectedChannel);

  return (
    <ListItem
      disablePadding
      onClick={() => setSelectedChannel(channel)}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" size="small">
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton
        selected={selectedChannel?.id === channel.id}
        sx={{ borderRadius: "10px" }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            display: "flex",
            alignItems: "center",
          }}
        >
          <TagIcon />
          <img src={channel.icon} alt="" className="w-4 h-4 m-2" />
          {"|"}
        </ListItemIcon>
        <ListItemText primary={channel.name} className="m-2" />
      </ListItemButton>
    </ListItem>
  );
};

export default ChannelItem;
