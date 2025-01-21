import MoreVertIcon from "@mui/icons-material/MoreVert";
import TagIcon from "@mui/icons-material/Tag";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import React from "react";
import { Channel } from "../hook/useChannel";
import useServerStore from "../store/useServerStore";
import ChannelAction from "./ChannelAction";

interface Props {
  channel: Channel;
}

const ChannelItem = ({ channel }: Props) => {
  const selectedChannel = useServerStore((s) => s.selectedChannel);
  const selectedServer = useServerStore((s) => s.selectedServer)!;
  const setSelectedChannel = useServerStore((s) => s.setSelectedChannel);
  const [showPopover, setShowPopover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const hideChannelMenu = () => {
    setShowPopover(false);
  };

  const channelActionPopover = (
    <Popover
      id="channel-menu"
      open={showPopover}
      anchorEl={anchorEl}
      onClose={hideChannelMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {selectedServer && selectedServer.id && (
        <ChannelAction
          channelId={channel.id}
          serverId={selectedServer.id}
          hidePopover={hideChannelMenu}
        />
      )}
    </Popover>
  );

  return (
    <ListItem
      disablePadding
      onClick={() => setSelectedChannel(channel)}
      secondaryAction={
        selectedChannel &&
        selectedChannel.id === channel.id && (
          <IconButton
            edge="end"
            aria-label="comments"
            size="small"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setShowPopover(true);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        )
      }
    >
      {channelActionPopover}
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
