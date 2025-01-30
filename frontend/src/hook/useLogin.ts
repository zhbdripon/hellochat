import { useMutation } from "react-query";
import APIClient from "../services/apiClient";
import useNotification from "./useNotification";

interface LoginSuccess {
  refresh: string;
  access: string;
}

interface LoginError {
  detail: string;
}

type LoginResponse = LoginSuccess | LoginError;

interface LoginRequest {
  username: string;
  password: string;
}

type useLoginParams = () => Promise<void>;

const useLogin = (onSuccess: useLoginParams) => {
  const { showNotification } = useNotification();
  const apiClient = new APIClient<LoginResponse>("auth/jwt/create/");

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: ({ username, password }: LoginRequest) =>
      apiClient.post({ username, password }, { withCredentials: true }),
    onSuccess: () => {
      showNotification("Login successful! Welcome back!");
      onSuccess();
    },
    onError: () => {
      showNotification(
        "Login failed! Please check your credentials and try again."
      );
    },
  });
};

export default useLogin;
