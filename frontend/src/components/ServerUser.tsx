import { Avatar, Badge, Box, Stack, styled, Typography } from "@mui/material";
import useWebSocket from "../hook/useWebSocket";

const ServerUser = () => {
  const { isConnected } = useWebSocket(undefined);
  const userName = localStorage.getItem("username") || "";
  const badgeDotColor = isConnected ? "#44b700" : "#D60000";

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: badgeDotColor,
      color: badgeDotColor,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <Box className="h-12 bg-iconBarDark flex flex-col justify-center">
      <Stack direction="row" className="flex flex-col items-center">
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
    </Box>
  );
};

export default ServerUser;
