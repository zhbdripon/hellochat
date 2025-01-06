import React from "react";
import { Box } from "@mui/material";
import useDarkMode from "../hook/useDarkMode";

interface Props {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const isDarkMode = useDarkMode();

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
