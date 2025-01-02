import ContentContainer from "../components/ContentContainer";
import Sidebar from "../components/Sidebar";
import useServerStore from "../store";
import ServerDetails from "../components/ServerDetails";

import { useColorScheme } from "@mui/material/styles";

const Server = () => {
  const { mode, setMode } = useColorScheme();
  const server = useServerStore((state) => state.selectedServer);

  return (
    <>
      <Sidebar>{server && <ServerDetails />}</Sidebar>
      <ContentContainer>
        <button
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        >
          Click me
        </button>
        chatArea
      </ContentContainer>
    </>
  );
};

export default Server;
