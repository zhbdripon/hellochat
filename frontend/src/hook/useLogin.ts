import { useMutation } from "react-query";
import APIClient from "../services/apiClient";

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

type useLoginParams = () => Promise<void>

const useLogin = (onSuccess: useLoginParams) => {
  const apiClient = new APIClient<LoginResponse>("auth/jwt/create/");

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: ({ username, password }: LoginRequest) =>
      apiClient.post({ username, password }),
    onSuccess: (data: LoginResponse) => {
      console.log(data);
      localStorage.setItem("access", data?.access);
      localStorage.setItem("refresh", data?.refresh);
      onSuccess()
    },
  });
};

export default useLogin;
