import ContentContainer from "../components/ContentContainer";
import Sidebar from "../components/Sidebar";
import useServerStore from "../store";
import ServerDetails from "../components/ServerDetails";
import ChatRoom from "../components/ChatRoom";

const Server = () => {
  const { selectedServer: server, selectedChannel: channel } = useServerStore(
    (state) => state
  );

  return (
    <>
      <Sidebar>{server && <ServerDetails />}</Sidebar>
      <ContentContainer>
        {server && channel && (
          <ChatRoom serverId={server.id} channelId={channel.id} />
        )}
      </ContentContainer>
    </>
  );
};

export default Server;
