import { Box, ListItemText, MenuItem, MenuList } from "@mui/material";
import { useNavigate } from "react-router";
import useLogoutMutation from "../hook/useLogoutMutation";

const UserMenuItems = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation(() => navigate("/auth"));

  return (
    <Box>
      <MenuList>
        <MenuItem>
          <ListItemText
            onClick={() => {
              logoutMutation.mutate();
            }}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default UserMenuItems;
