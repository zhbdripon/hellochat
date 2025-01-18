import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useConfirmationModal } from "../hook/useConfirmationModal";
import useServerDelete from "../hook/useServerDelete";
import useServerStore from "../store/useServerStore";

const ServerMenu = () => {
  const { hideServerMenu, showInviteModal } = useServerStore();
  const { showModal } = useConfirmationModal();
  const server = useServerStore((s) => s.selectedServer);
  const mutation = useServerDelete();

  const handleServerDelete = () => {
    if (server && server.id) {
      mutation.mutate(server.id);
    }
  };

  const handleServerDeleteOperation = () => {
    hideServerMenu();
    showModal(`Confirm delete server ${server?.name}?`, handleServerDelete);
  };

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
      <ListItemButton
        className="rounded-lg"
        onClick={handleServerDeleteOperation}
      >
        <PersonAddAltIcon className="mr-2" />
        <ListItemText primary="Delete Server" />
      </ListItemButton>
    </List>
  );
};

export default ServerMenu;
