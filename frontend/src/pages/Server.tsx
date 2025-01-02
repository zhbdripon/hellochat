import ContentContainer from "../components/ContentContainer";
import Sidebar from "../components/Sidebar";
import useServerStore from "../store";
import ServerDetails from "../components/ServerDetails";

const Server = () => {
  const server = useServerStore((state) => state.selectedServer);

  return (
    <>
      <Sidebar>{server && <ServerDetails />}</Sidebar>
      <ContentContainer>
        chatArea
      </ContentContainer>
    </>
  );
};

export default Server;
