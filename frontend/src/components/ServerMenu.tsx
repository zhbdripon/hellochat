import { List, ListItemButton, ListItemText } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import useServerStore from "../store/useServerStore";

const ServerMenu = () => {
  const { hideServerMenu, showInviteModal } = useServerStore();

  return (
    <List className="p-2">
      <ListItemButton
        className="rounded-lg"
        onClick={() => {
          hideServerMenu();
          showInviteModal();
        }}
      >
        <PersonAddAltIcon className="mr-2" />
        <ListItemText primary="Invite Members" />
      </ListItemButton>
    </List>
  );
};

export default ServerMenu;
