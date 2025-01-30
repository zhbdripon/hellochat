import axios from "axios";

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
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
          "http://172.28.28.49:8000/api/auth/jwt/refresh/",
          {},
          { withCredentials: true }
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
