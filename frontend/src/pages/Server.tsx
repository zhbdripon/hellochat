import ContentContainer from "../components/ContentContainer";
import Sidebar from "../components/Sidebar";

import { useColorScheme } from "@mui/material/styles";

const Server = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <>
      <Sidebar>channel list</Sidebar>
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
