import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";

export interface Message {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

interface UseMessageParams {
  channelId: number;
}

const useMessage = ({ channelId }: UseMessageParams) => {
  const apiClient = new APIClient<ListApiResponse<Message>>(
    `/messages/?channel_id=${channelId}`
  );

  return useQuery({
    queryKey: ["messages", channelId],
    queryFn: apiClient.get,
  });
};

export default useMessage;
