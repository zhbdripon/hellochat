import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import useDarkMode from "../hook/useDarkMode";
import useWebSocket from "../hook/useWebSocket";

import Popover from "@mui/material/Popover";
import React from "react";
import { getStyledBadge } from "./styled/StyledBadge";

const ServerQuickActionMenu = () => {
  const { isConnected } = useWebSocket(undefined);
  const isDarkMode = useDarkMode();
  const userName = localStorage.getItem("username") || "";
  const badgeDotColor = isConnected ? "#44b700" : "#D60000";
  const StyledBadge = getStyledBadge({ badgeDotColor });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className={`h-12 flex flex-col justify-center items-start ${
        isDarkMode ? "bg-iconBarDark" : "bg-iconBarLight"
      }`}
    >
      <Button
        sx={{ textTransform: "none" }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <Stack direction="row">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            className="px-2"
          >
            <Avatar
              alt={userName}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24 }}
            />
          </StyledBadge>
          <Typography>{userName}</Typography>
        </Stack>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box>items will be added</Box>
      </Popover>
    </Box>
  );
};

export default ServerQuickActionMenu;
