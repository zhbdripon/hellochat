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

  getAll = (config: AxiosRequestConfig = {}) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };

  get = (config: AxiosRequestConfig = {}) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };

  post = (data: any = {}, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  delete = (id: number | string, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .delete(this.endpoint + id, config)
      .then((res) => res.data);
  };
}

export default APIClient;
