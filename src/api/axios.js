
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { getOrCreateGuestId } from "@/lib/guestId";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { token, isAuthenticated } = useAuthStore.getState();

    if (token && isAuthenticated) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // NEW: attach guest ID globally, not just on cart calls — so login,
    // register, and verify-email requests can carry it too, letting the
    // backend's merge-on-login logic actually receive it.
    if (!isAuthenticated) {
      const guestId = getOrCreateGuestId();
      if (guestId) {
        config.headers["x-guest-id"] = guestId;
      }
    }

    console.log("📡 API Request:", {
      url: config.url,
      method: config.method,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Handle responses + token refresh
api.interceptors.response.use(
  (response) => {
    console.log("📥 API Response:", response.data);
    return response;
  },

  async (error) => {
    console.error("❌ API Error Response:", error?.response?.data);

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

          useAuthStore
            .getState()
            .setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("❌ Refresh Token Failed:", refreshError);

        useAuthStore.getState().logout();

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;