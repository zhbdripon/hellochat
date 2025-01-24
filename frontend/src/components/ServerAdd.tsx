import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { forwardRef, useContext } from "react";
import { ServerAddContext } from "../context/ServerAddContext";
import useNotification from "../hook/useNotification";
import useServerCategory from "../hook/useServerCategory";
import useServerAdd from "../hook/userServerAdd";

const ServerCategoryStep = () => {
  const { closeModal, addNewServerData, moveNext } =
    useContext(ServerAddContext)!;
  const { data: serverCategoryData, isLoading, error } = useServerCategory();
  const serverCategories = serverCategoryData?.results;

  if (!serverCategories || error) return null;
  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>
      <Box className="flex flex-col items-center mb-3">
        <Typography variant="h6">Create Your Server</Typography>
        <Typography>Select an existing category or add a new one</Typography>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {serverCategories?.map((category) => {
          return (
            <ListItem
              key={category.id}
              sx={{ padding: "0px 5px" }}
              className="rounded-lg"
            >
              <ListItemButton
                sx={{ padding: "0px 5px", borderRadius: "8px" }}
                onClick={() => {
                  addNewServerData({ category: category.id });
                  moveNext();
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <img src={category.icon} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={category.name}
                  secondary={category.description}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const ServerNameStep = () => {
  const { showNotification } = useNotification();
  const { closeModal, addNewServerData, movePrev, newServerData } =
    useContext(ServerAddContext)!;
  const { data: serverCategoryData, isLoading, error } = useServerCategory();
  const serverCategories = serverCategoryData?.results;
  const mutation = useServerAdd({
    handleServerCreate: () => {
      closeModal();
      showNotification("Server created");
    },
    handleError: () => {},
  });

  if (!serverCategories || error) return null;
  if (isLoading) return <CircularProgress />;

  const isValidNewServerData = (): boolean => {
    const { category, name } = newServerData;

    return !!category && !!name;
  };

  return (
    <Box>
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>
      <Box className="flex flex-col items-center mb-3">
        <Typography variant="h6">Create Your Server</Typography>
        <Typography>Give your server a name</Typography>
      </Box>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="server name"
          variant="standard"
          onChange={(e) => addNewServerData({ name: e.target.value })}
        />
        <Box className="w-full flex flex-row justify-between">
          <Button onClick={movePrev}>Back</Button>
          <Button
            disabled={!isValidNewServerData()}
            onClick={() => mutation.mutate(newServerData)}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const ServerAddSteps = forwardRef(() => {
  const { step } = useContext(ServerAddContext)!;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Box sx={style}>
      {step === 0 && <ServerCategoryStep />} {step === 1 && <ServerNameStep />}
    </Box>
  );
});

const ServerAdd = () => {
  const { showModal, openModal, closeModal } = useContext(ServerAddContext)!;

  const handleClose = () => {
    closeModal();
  };

  const serverCreationModal = (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ServerAddSteps />
    </Modal>
  );

  return (
    <>
      <Tooltip
        title="Create new server"
        placement="right"
        className="cursor-pointer"
      >
        <Avatar
          sx={{ width: 56, height: 56 }}
          variant="rounded"
          onClick={openModal}
        >
          +
        </Avatar>
      </Tooltip>
      {serverCreationModal}
    </>
  );
};

export default ServerAdd;
