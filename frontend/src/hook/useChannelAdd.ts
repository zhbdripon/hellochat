import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";
import { Channel } from "./useChannel";
import useNotification from "./useNotification";

export interface ChannelPayload
  extends Omit<Channel, "id" | "category" | "icon" | "banner"> {
  category: number | string;
}

interface Params {
  serverId: number | string;
  onSuccess: () => void;
}

const useChannelAdd = ({ serverId, onSuccess }: Params) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Channel>(`servers/${serverId}/channels/`);
  const { showNotification } = useNotification();

  return useMutation<Channel, AxiosError, ChannelPayload>({
    mutationFn: (channelData) => apiClient.post(channelData),
    onSuccess: (newlyCreatedChannel) => {
      queryClient.setQueryData<ListApiResponse<Channel>>(
        ["channels", serverId],
        (previousChannels) => {
          if (previousChannels) {
            return {
              ...previousChannels,
              count: previousChannels.count + 1,
              results: [...previousChannels.results, newlyCreatedChannel],
            };
          }

          return previousChannels!;
        }
      );

      showNotification("Channel created successfully");
      onSuccess();
    },
    onError: () => {
      showNotification("Failed to create channel");
    },
  });
};

export default useChannelAdd;
