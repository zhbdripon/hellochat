import React from "react";
import useDarkMode from "../hook/useDarkMode";

interface Props {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
  const isDarkMode = useDarkMode();

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
