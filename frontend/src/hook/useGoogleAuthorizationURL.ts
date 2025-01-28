import { AxiosError } from "axios";
import { useMutation } from "react-query";
import APIClient from "../services/apiClient";
import useNotification from "./useNotification";

export const REDIRECT_URL = "http://localhost:5173/gcal";

interface GoogleAuthorizationURLResponse {
  authorization_url: string;
}

const useGoogleAuthorizationURL = () => {
  const { showNotification } = useNotification();
  const apiClient = new APIClient<GoogleAuthorizationURLResponse>(
    `auth/o/google-oauth2?redirect_uri=${REDIRECT_URL}`
  );

  return useMutation<GoogleAuthorizationURLResponse, AxiosError>({
    mutationFn: () =>
      apiClient.get({
        withCredentials: true,
      }),
    onSuccess: ({ authorization_url }: GoogleAuthorizationURLResponse) => {
      window.location.href = authorization_url;
    },
    onError: () => {
      showNotification("Failed to get Google authorization URL");
    },
  });
};

export default useGoogleAuthorizationURL;
