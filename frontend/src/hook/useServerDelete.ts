import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { NotificationContext } from "../context/notificationProvider";
import APIClient, { ListApiResponse } from "../services/apiClient";
import { Server } from "./useServer";

const useServerDelete = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext)!;
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
