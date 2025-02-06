import { Avatar, Badge, Box, IconButton } from "@mui/material";
import useDarkMode from "../hook/useDarkMode";

import Popover from "@mui/material/Popover";
import React from "react";
import UserMenuItems from "./UserMenuItems";

const UserMenu = () => {
  const isDarkMode = useDarkMode();
  const userName = localStorage.getItem("username") || "";
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(e.currentTarget);
        }}
        aria-label="delete"
        size="small"
        disableRipple
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          className="px-2"
        >
          <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <UserMenuItems />
      </Popover>
    </Box>
  );
};

export default UserMenu;
