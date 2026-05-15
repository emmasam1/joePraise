// import axios from 'axios';
// import { useAuthStore } from '@/store/authStore'; // Clean absolute import

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

//   (config) => {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

    // Handle expired access token
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

        // Update auth store with new token
        useAuthStore
          .getState()
          .setLoginSuccess(data.user, data.accessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error("❌ Refresh Token Failed:", refreshError);

        useAuthStore.getState().logout();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;