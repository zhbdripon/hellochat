import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";

export interface ListApiResponse<T> {
  count: number;
  results: T[];
  next?: string | null;
  previous?: string | null;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };

  get = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  post = (data: any) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
