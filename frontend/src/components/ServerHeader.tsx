import { Box, Button, Popover } from "@mui/material";
import React from "react";
import { ChannelAddProvider } from "../context/ChannelAddContext";
import useDarkMode from "../hook/useDarkMode";
import useServerStore from "../store/useServerStore";
import ChannelAdd from "./ChannelAdd";
import MemberInvite from "./MemberInvite";
import ServerMenu from "./ServerMenu";

interface ServerHeaderProps {
  serverName: string;
}

const ServerHeader = ({ serverName }: ServerHeaderProps) => {
  const {
    serverMenuOpen,
    showServerMenu,
    hideServerMenu,
    inviteModalOpen,
    channelCreateModalOpen,
  } = useServerStore();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const isDarkMode = useDarkMode();

  const ServerPopover = (
    <Popover
      id="server-header"
      open={serverMenuOpen}
      anchorEl={anchorEl}
      onClose={hideServerMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <ServerMenu />
    </Popover>
  );

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
      <Button
        sx={{ textTransform: "none" }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(e.currentTarget);
          showServerMenu();
        }}
      >
        {serverName}
      </Button>
      {ServerPopover}
      {inviteModalOpen && <MemberInvite />}
      {channelCreateModalOpen && (
        <ChannelAddProvider>
          <ChannelAdd />
        </ChannelAddProvider>
      )}
    </Box>
  );
};

export default ServerHeader;
