import React from "react";
import { useTheme } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme?.palette.mode === "dark";

  return (
    <div
      className={`
      w-[calc(100%-304px)]
      h-screen
      ${isDarkMode ? "bg-mainDark" : "bg-mainLight"}`}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
