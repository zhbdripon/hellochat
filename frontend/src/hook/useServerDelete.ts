import { useMutation, useQueryClient } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";
import useNotification from "./useNotification";
import { Server } from "./useServer";

const useServerDelete = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const apiClient = new APIClient("servers/");

  const removeDeletedServerFromQuery = (id: string | number) => {
    queryClient.setQueryData<ListApiResponse<Server>>(
      "servers",
      (previousServers) => {
        if (previousServers) {
          return {
            ...previousServers,
            count: previousServers.count + 1,
            results: previousServers.results.filter(
              (server) => server.id !== id
            ),
          } as ListApiResponse<Server>;
        }

        return previousServers!;
      }
    );
  };

  return useMutation({
    mutationFn: (id: number | string) => apiClient.delete(id),
    onSuccess: (_, id) => {
      removeDeletedServerFromQuery(id);
      showNotification("Server has been deleted");
    },
    onError: () => {
      showNotification("Couldn't delete the server");
    },
  });
};

export default useServerDelete;
