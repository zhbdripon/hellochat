import axios from "axios";

const backendProtocol = import.meta.env.VITE_BACKEND_PROTOCOL;
const backendHost = import.meta.env.VITE_BACKEND_HOST;
const backendPort = import.meta.env.VITE_BACKEND_PORT;
const apiURL = `${backendProtocol}://${backendHost}:${backendPort}/api/`;

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    const csrfToken = getCookie("csrftoken");

    if (csrfToken && config.method !== "get") {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${apiURL}auth/jwt/refresh/`,
          {},
          {
            withCredentials: true,
            headers: { "X-CSRFToken": getCookie("csrftoken") },
          }
        );

        if (response.status === 200) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("username");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
