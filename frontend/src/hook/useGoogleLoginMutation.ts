import { useMutation } from "react-query";
import APIClient from "../services/apiClient";
import useNotification from "./useNotification";

interface GoogleLoginResponse {
  access: string;
  refresh: string;
  user: string;
}

const useGoogleLoginMutation = () => {
  const { showNotification } = useNotification();
  const apiClient = new APIClient<GoogleLoginResponse>("auth/o/google-oauth2/");

  return useMutation({
    mutationFn: (data: URLSearchParams) =>
      apiClient.post(data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }),
    onSuccess: (data: GoogleLoginResponse) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", data.user);
      window.location.href = "/";
    },
    onError: () => {
      showNotification("Failed to login with Google");
    },
  });
};

export default useGoogleLoginMutation;
