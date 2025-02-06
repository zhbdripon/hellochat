import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Tooltip, useColorScheme } from "@mui/material";
import useDarkMode from "../hook/useDarkMode";

const DarkModeToggler = () => {
  const isDarkMode = useDarkMode();
  const { setMode } = useColorScheme();
  return (
    <Tooltip title="Toggle Dark Mode" placement="right">
      <WbSunnyIcon
        onClick={() => {
          setMode(isDarkMode ? "light" : "dark");
        }}
        className="cursor-pointer"
      />
    </Tooltip>
  );
};

export default DarkModeToggler;
