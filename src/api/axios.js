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
    return Promise.reject(error);
  }
);

export default api;