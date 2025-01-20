import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";

export interface ChannelCategory {
  id: number;
  name: string;
  server: number;
  banner: string;
}
export interface Channel {
  id: number;
  name: string;
  icon: string;
  banner: string;
  category: ChannelCategory;
}

const useChannel = ({ serverId }: { serverId: number }) => {
  const apiClient = new APIClient<ListApiResponse<Channel>>(
    `servers/${serverId}/channels/`
  );

  return useQuery({
    queryKey: ["channels", serverId],
    queryFn: apiClient.getAll,
  });
};

export default useChannel;
