import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";

export interface ChannelCategory {
  id: number;
  name: string;
  server: number;
  banner: string;
}

const useChannelCategory = ({ serverId }: { serverId: number }) => {
  const apiClient = new APIClient<ListApiResponse<ChannelCategory>>(
    `servers/${serverId}/channel-categories/`
  );

  return useQuery({
    queryKey: ["channel-categories", serverId],
    queryFn: apiClient.getAll,
  });
};

export default useChannelCategory;
