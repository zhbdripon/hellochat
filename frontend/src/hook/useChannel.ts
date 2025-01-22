import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";
import { ChannelCategory } from "./useChannelCategory";

export interface Channel {
  id: number;
  name: string;
  topic: string;
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
