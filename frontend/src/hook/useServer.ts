import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";

export interface Server {
  id?: number;
  name: string;
  category: number;
  description: string;
}

const useServer = () => {
  const apiClient = new APIClient<ListApiResponse<Server>>("servers/");

  return useQuery({
    queryKey: ["servers"],
    queryFn: apiClient.getAll,
  });
};

export default useServer;
