import { Box, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import useServer from "../hook/useServer";
import useServerStore from "../store";
import { stringToColor } from "../utils";

const IconBar = () => {
  const setSelectedServer = useServerStore((s) => s.setSelectedServer);
  const selectedServer = useServerStore((s) => s.selectedServer);
  console.log(selectedServer);

  const { data: serverData, isLoading, error } = useServer();
  const servers = serverData?.results;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !serverData) return null;

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 56,
        height: 56,
      },
      children: name[0].toUpperCase(),
    };
  }

  return (
    <Box className="w-[72px] h-screen flex flex-row justify-center py-5">
      <Stack direction="column" spacing={2}>
        {servers?.map((server) => (
          <Tooltip title={server.name} placement="right" key={server.id}>
            <Avatar
              className={
                server.id === selectedServer?.id
                  ? "border-4 border-red-600"
                  : ""
              }
              variant="rounded"
              {...stringAvatar(server.name)}
              onClick={() => {
                setSelectedServer(server);
              }}
            />
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default IconBar;
