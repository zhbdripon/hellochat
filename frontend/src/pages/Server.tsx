import ChatRoom from "../components/ChatRoom";
import ContentContainer from "../components/ContentContainer";
import ServerDetails from "../components/ServerDetails";
import Sidebar from "../components/Sidebar";
import useServerStore from "../store";

const Server = () => {
  const { selectedServer: server, selectedChannel: channel } = useServerStore(
    (state) => state
  );

  if (!server) return null;

  return (
    <>
      <Sidebar>
        <ServerDetails />
      </Sidebar>
      <ContentContainer>
        {server && channel && (
          <ChatRoom
            key={channel.id}
            serverId={server.id}
            channelId={channel.id}
          />
        )}
      </ContentContainer>
    </>
  );
};

export default Server;
