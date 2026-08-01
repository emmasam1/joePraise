

import { create } from "zustand";
import api from "@/api/axios";

export const useBusinessDashboardStore = create((set) => ({
  // ---- overview page ----
  overviewStats: null,
  recentOrders: [],
  revenueTrend: [],
  reviewBreakdown: null,
  customerRatio: null,
  demographics: null,
  overviewLoading: false,
  overviewError: null,

  // ---- customers page ----
  customers: [],
  customerStats: null,
  pagination: null,
  filters: null,
  customersLoading: false,
  customersError: null,

  // ---- single customer (view modal) ----
  selectedCustomer: null,
  customerDetailLoading: false,
  customerDetailError: null,

  // ---- report customer ----
  reportLoading: false,
  reportError: null,

  getOverview: async () => {
    try {
      set({ overviewLoading: true, overviewError: null });

      const { data } = await api.get("/business/dashboard/overview");

      if (data.success) {
        set({
          overviewStats: data.stats,
          recentOrders: data.recentOrders,
          revenueTrend: data.revenueTrend,
          reviewBreakdown: data.reviewBreakdown,
          customerRatio: data.customerRatio,
          demographics: data.demographics,
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

  getCustomers: async (params = {}) => {
    try {
      set({ customersLoading: true, customersError: null });

      const { data } = await api.get("/business/dashboard/customers", { params });

      if (data.success) {
        set({
          customers: data.customers,
          customerStats: data.stats,
          pagination: data.pagination,
          filters: data.filters,
          customersLoading: false,
        });
      }
    } catch (error) {
      set({
        customersLoading: false,
        customersError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load customers",
      });
    }
  },

  getCustomerDetail: async (customerId) => {
    try {
      set({ customerDetailLoading: true, customerDetailError: null });

      const { data } = await api.get(`/business/dashboard/customers/${customerId}`);

      if (data.success) {
        set({ selectedCustomer: data, customerDetailLoading: false });
      }
    } catch (error) {
      set({
        customerDetailLoading: false,
        customerDetailError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load customer",
      });
    }
  },

  clearSelectedCustomer: () => set({ selectedCustomer: null }),

  reportCustomer: async (customerId, { reason, description }) => {
    try {
      set({ reportLoading: true, reportError: null });

      const { data } = await api.post(`/business/dashboard/customers/${customerId}/report`, {
        reason,
        description,
      });

      set({ reportLoading: false });
      return { success: true, message: data.message };
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || "Failed to submit report";
      set({ reportLoading: false, reportError: msg });
      return { success: false, message: msg };
    }
  },
}));
