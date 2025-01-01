import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";

interface Server {
  id: number;
  name: string;
}

const useServer = () => {
  const apiClient = new APIClient<ListApiResponse<Server>>("api/servers/");

  return useQuery({
    queryKey: ["servers"],
    queryFn: apiClient.getAll,
  });
};

export default useServer;
