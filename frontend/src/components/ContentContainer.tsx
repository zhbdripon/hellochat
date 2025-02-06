import React from "react";
import useDarkMode from "../hook/useDarkMode";
import Menubar from "./Menubar";

interface Props {
  children?: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
  const isDarkMode = useDarkMode();

  return (
    <div
      className={`
        ${children ? "w-[calc(100%-304px)]" : "w-full"}
        h-screen
        ${isDarkMode ? "bg-mainDark" : "bg-mainLight"}`}
    >
      <Menubar />
      {children && <div className="h-calc-minus-2rem">{children}</div>}
    </div>
  );
};

export default ContentContainer;
