import { useMutation, useQueryClient } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";
import { Server } from "./useServer";

interface ServerPayload extends Omit<Server, "id"> {}

interface UserServerAddParams {
  handleServerCreate: () => void;
  handleError: () => void;
}

const useServerAdd = ({
  handleServerCreate,
  handleError,
}: UserServerAddParams) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Server>("servers/");

  return useMutation<Server, Error, ServerPayload>({
    mutationFn: (serverData) => apiClient.post(serverData),
    onSuccess: (newlyCreatedServer) => {
      queryClient.setQueryData<ListApiResponse<Server>>(
        "servers",
        (previousServers) => {
          if (previousServers) {
            return {
              ...previousServers,
              count: previousServers.count + 1,
              results: [...previousServers.results, newlyCreatedServer],
            };
          }

          return previousServers!;
        }
      );
      handleServerCreate();
    },
    onError: () => {
      handleError();
    },
  });
};

export default useServerAdd;
