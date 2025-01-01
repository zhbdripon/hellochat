import React from "react";

interface Props {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: Props) => {
  return <div className="w-[calc(100%-304px)] h-screen">{children}</div>;
};

export default ContentContainer;
