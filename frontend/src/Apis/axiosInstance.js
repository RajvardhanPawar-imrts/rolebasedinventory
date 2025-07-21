import axios from "axios";
import {
  getToken,
  getRefreshToken,
  setAccessToken,
  removeTokens,
} from "../auth/auth";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 by trying refresh token
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
        const refresh = getRefreshToken();
        if (!refresh) throw new Error("Missing refresh token");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh,
          }
        );

        const newAccess = res.data.access;
        setAccessToken(newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest); // Retry the failed request
      } catch (err) {
        removeTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
