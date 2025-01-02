import axios, { AxiosRequestConfig } from "axios";

export interface ListApiResponse<T> {
  count: number;
  results: T[];
  next?: string | null;
  previous?: string | null;
}

const axiosInstance = axios.create({
  baseURL: "http://172.28.28.49:8000/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  post = (data: any) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;