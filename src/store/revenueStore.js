import { create } from "zustand";
import api from "@/api/axios";

export const useRevenueStore = create((set, get) => ({
  // ---- revenue overview page ----
  stats: null,
  chartData: null, // { Day: [...], Week: [...], Month: [...], Year: [...] }
  weeklyRevenue: [],
  statusBreakdown: [],
  averageOrderValueK: 0,
  transactions: [],
  pagination: null,
  filters: { startDate: null, endDate: null, serviceType: "" },

  revenueLoading: false,
  revenueError: null,

  getRevenue: async (params = {}) => {
    try {
      set({ revenueLoading: true, revenueError: null });

      const { data } = await api.get("/business/dashboard/revenue", { params });

      if (data.success) {
        set({
          stats: data.stats,
          chartData: data.chartData,
          weeklyRevenue: data.weeklyRevenue,
          statusBreakdown: data.statusBreakdown,
          averageOrderValueK: data.averageOrderValueK,
          transactions: data.transactions?.data || [],
          pagination: {
            total: data.transactions?.total,
            page: data.transactions?.page,
            limit: data.transactions?.limit,
            totalPages: data.transactions?.totalPages,
            hasNextPage: data.transactions?.hasNextPage,
            hasPreviousPage: data.transactions?.hasPreviousPage,
          },
          filters: data.filters,
          revenueLoading: false,
        });
      }
    } catch (error) {
      set({
        revenueLoading: false,
        revenueError:
          error?.response?.data?.message || error.message || "Failed to load revenue data",
      });
    }
  },

  // convenience helper: re-fetch with updated filters, keeping current page unless overridden
  setPage: async (page) => {
    const { filters } = get();
    await get().getRevenue({ ...filters, page });
  },
}));
