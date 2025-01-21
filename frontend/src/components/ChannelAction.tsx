import { List, ListItemButton, ListItemText } from "@mui/material";
import useChannelDelete from "../hook/useChannelDelete";
import { useConfirmationModal } from "../hook/useConfirmationModal";

interface Props {
  serverId: number;
  channelId: number;
  hidePopover: () => void;
}

const ChannelAction = ({ channelId, serverId, hidePopover }: Props) => {
  const mutation = useChannelDelete({ serverId: serverId });
  const { showModal, hideModal } = useConfirmationModal();

  const handleDeleteOperation = () => {
    showModal("Are you sure you want to delete this channel?", () => {
      mutation.mutate(channelId);
      hideModal();
      hidePopover();
    });
  };

  return (
    <List>
      <ListItemButton onClick={handleDeleteOperation}>
        <ListItemText primary="Delete Channel" />
      </ListItemButton>
    </List>
  );
};

export default ChannelAction;
