import { create } from "zustand";
import api from "@/api/axios";

export const useCustomerOrderStore = create((set) => ({
  // ---- overview page (stats + recent orders + charts) ----
  overviewStats: null,
  recentOrders: [],
  spendingTrend: [],
  orderStatusTrend: [],
  overviewLoading: false,
  overviewError: null,

  // ---- orders page (tabs + search + pagination) ----
  orders: [],
  stats: null,
  pagination: null,
  filters: null,
  ordersLoading: false,
  ordersError: null,

  getOverview: async () => {
    try {
      set({ overviewLoading: true, overviewError: null });

      const { data } = await api.get("/orders/my-orders/overview");

      if (data.success) {
        set({
          overviewStats: data.stats,
          recentOrders: data.recentOrders,
          spendingTrend: data.spendingTrend,
          orderStatusTrend: data.orderStatusTrend,
          overviewLoading: false,
        });
      }
    } catch (error) {
      set({
        overviewLoading: false,
        overviewError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load dashboard overview",
      });
    }
  },

  getOrders: async (params = {}) => {
    try {
      set({ ordersLoading: true, ordersError: null });

      const { data } = await api.get("/orders/my-orders", { params });

      if (data.success) {
        set({
          orders: data.orders,
          stats: data.stats,
          pagination: data.pagination,
          filters: data.filters,
          ordersLoading: false,
        });
      }
    } catch (error) {
      set({
        ordersLoading: false,
        ordersError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load orders",
      });
    }
  },
}));
