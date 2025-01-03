import ContentContainer from "../components/ContentContainer";
import Sidebar from "../components/Sidebar";
import useServerStore from "../store";
import ServerDetails from "../components/ServerDetails";
import ChatRoom from "../components/ChatRoom";

const Server = () => {
  const server = useServerStore((state) => state.selectedServer);

  return (
    <>
      <Sidebar>{server && <ServerDetails />}</Sidebar>
      <ContentContainer>
        <ChatRoom />
      </ContentContainer>
    </>
  );
};

export default Server;
