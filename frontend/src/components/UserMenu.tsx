import { Box, ListItemText, MenuItem, MenuList } from "@mui/material";
import { useNavigate } from "react-router";

const UserMenu = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <MenuList>
        <MenuItem>
          <ListItemText
            onClick={() => {
              localStorage.clear();
              navigate("/auth");
            }}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default UserMenu;
