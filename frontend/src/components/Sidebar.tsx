import React from "react";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme?.palette.mode === "dark";

  return (
    <Box
      className={`
        w-60 h-screen 
        ${isDarkMode ? "bg-sidebarDark" : "bg-sidebarLight"}`}
    >
      {children}
    </Box>
  );
};

export default Sidebar;
