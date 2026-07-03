import { create } from "zustand";
import api from "@/api/axios";

export const useAdminDashboardStore = create((set) => ({
  dashboard: null,
  dashboardLoading: false,
  dashboardError: null,

  getDashboard: async () => {
    try {
      set({
        dashboardLoading: true,
        dashboardError: null,
      });

      const { data } = await api.get("/admin/dashboard");

      if (data.success) {
        set({
          dashboard: data,
          dashboardLoading: false,
        });
      }
    } catch (error) {
      set({
        dashboardLoading: false,
        dashboardError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load dashboard",
      });
    }
  },

  clearDashboard: () => {
    set({
      dashboard: null,
      dashboardError: null,
    });
  },
}));