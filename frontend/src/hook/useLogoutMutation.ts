import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/apiClient";
import useNotification from "./useNotification";

const useLogoutMutation = (onSuccess: () => void) => {
  const { showNotification } = useNotification();
  const apiClient = new APIClient("auth/logout/");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.post(),
    onSuccess: () => {
      localStorage.removeItem("username");
      showNotification("You have been logged out");
      queryClient.clear();
      onSuccess();
    },
    onError: () => {
      showNotification("Logout failed!");
    },
  });
};

export default useLogoutMutation;
