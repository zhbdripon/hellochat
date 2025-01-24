import { useMutation, useQueryClient } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";
import { Channel } from "./useChannel";
import useNotification from "./useNotification";

interface ChannelDeleteParams {
  serverId: number | string;
}

const useChannelDelete = ({ serverId }: ChannelDeleteParams) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const apiClient = new APIClient(`servers/${serverId}/channels/`);

  const removeDeletedChannelFromQuery = (id: string | number) => {
    queryClient.setQueryData<ListApiResponse<Channel>>(
      ["channels", serverId],
      (previousChannels) => {
        if (previousChannels) {
          return {
            ...previousChannels,
            count: previousChannels.count - 1,
            results: previousChannels.results.filter(
              (channel) => channel.id !== id
            ),
          } as ListApiResponse<Channel>;
        }

        return previousChannels!;
      }
    );
  };

  return useMutation({
    mutationFn: (id: number | string) => apiClient.delete(id),
    onSuccess: (_, id) => {
      removeDeletedChannelFromQuery(id);
      showNotification("Channel has been deleted");
    },
    onError: () => {
      showNotification("Couldn't delete the channel");
    },
  });
};

export default useChannelDelete;
