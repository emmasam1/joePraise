// import axios from 'axios';
<<<<<<< HEAD
// import { useAuthStore } from '@/store/authStore'; // Clean absolute import
=======
// import { useAuthStore } from '@/store/authStore';
>>>>>>> 6d58212fece8b7dfba5e99ac0f8e263d4dfbc91e

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

<<<<<<< HEAD
// // Automatically inject JWT token into requests if it exists
=======
>>>>>>> 6d58212fece8b7dfba5e99ac0f8e263d4dfbc91e
// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

<<<<<<< HEAD
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

// Log responses globally
api.interceptors.response.use(
  (response) => {
    console.log("📥 API Response:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error Response:", error?.response?.data);
=======
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, 
          {}, 
          { withCredentials: true }
        );

        // Sync the new token back to store & cookies
        useAuthStore.getState().setLoginSuccess(data.user, data.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
>>>>>>> 6d58212fece8b7dfba5e99ac0f8e263d4dfbc91e
    return Promise.reject(error);
  }
);

export default api;