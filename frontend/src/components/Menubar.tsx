import { Box, styled, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import useDarkMode from "../hook/useDarkMode";
import DarkModeToggler from "./DarkModeToggler";
import UserMenu from "./UserMenu";

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&.MuiToolbar-root": {
    minHeight: 0,
    height: "3.5rem",
    display: "flex",
    flexFlow: "row-reverse",
    padding: 0,
  },
}));

const Menubar = () => {
  const isDarkMode = useDarkMode();

  const CustomAppBar = styled(AppBar)(({ theme }) => ({
    color: theme.palette.text.primary,
    "&.MuiAppBar-root": {
      backgroundColor: isDarkMode ? "#2B2D31" : "#f2f3f5",
      color: "black",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1, height: "2rem", width: "100%" }}>
      <CustomAppBar position="static">
        <CustomToolbar>
          <UserMenu />
          <DarkModeToggler />
        </CustomToolbar>
      </CustomAppBar>
    </Box>
  );
};

export default Menubar;
