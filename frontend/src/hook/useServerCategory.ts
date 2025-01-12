import { useQuery } from "react-query";
import APIClient, { ListApiResponse } from "../services/apiClient";

interface ServerCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const useServerCategory = () => {
  const apiClient = new APIClient<ListApiResponse<ServerCategory>>(
    "server-categories/"
  );
  return useQuery({
    queryKey: ["server_categories"],
    queryFn: apiClient.getAll,
  });
};

export default useServerCategory;
