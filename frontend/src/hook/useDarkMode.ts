import { useTheme } from "@emotion/react";

const useDarkMode = () => {
  const theme = useTheme();
  return theme?.palette.mode === "dark";
};

export default useDarkMode;
