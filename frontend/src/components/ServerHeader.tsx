import { Box, Button, Popover } from "@mui/material";
import React, { useState } from "react";
import useDarkMode from "../hook/useDarkMode";
import ServerMenu from "./ServerMenu";
import useServerStore from "../store/useServerStore";
import MemberInvite from "./MemberInvite";

interface ServerHeaderProps {
  serverName: string;
}

const ServerHeader = ({ serverName }: ServerHeaderProps) => {
  const { serverMenuOpen, showServerMenu, hideServerMenu, inviteModalOpen } =
    useServerStore();

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
    </Box>
  );
};

export default ServerHeader;
