import React from "react";
import { useTheme } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme?.palette.mode === "dark";

  return (
    <div
      className={`
        w-60 h-screen 
        ${isDarkMode ? "bg-sidebarDark" : "bg-sidebarLight"}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
