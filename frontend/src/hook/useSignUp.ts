import { AxiosError } from "axios";
import { useMutation } from "react-query";
import APIClient from "../services/apiClient";
import useNotification from "./useNotification";

export interface SignUpPayload {
  email: string;
  username: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  username: string;
}

interface UseSignUpProps {
  onSuccess: () => void;
}

const useSignUp = ({ onSuccess }: UseSignUpProps) => {
  const { showNotification } = useNotification();
  const apiClient = new APIClient<SignUpResponse>("auth/users/");

  return useMutation<SignUpResponse, AxiosError, SignUpPayload>({
    mutationFn: (signUpPayload: SignUpPayload) => apiClient.post(signUpPayload),
    onSuccess: () => {
      showNotification("Sign up successful! Please login to continue.");
      onSuccess();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        const data = error.response.data;
        if (data) {
          Object.values(data).forEach((value: string) => {
            showNotification(value);
          });
        }
      } else {
        showNotification(
          "Sign up failed! Please check your credentials and try again."
        );
      }
    },
  });
};

export default useSignUp;
