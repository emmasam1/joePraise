import { create } from "zustand";
import api from "@/api/axios";

export const useCustomerManagementStore = create((set) => ({
  // ---- customers list ----
  customers: [],
  analytics: null,
  pagination: null,
  filters: null,
  customersLoading: false,
  customersError: null,

  // ---- single customer ----
  selectedCustomer: null,
  customerStatistics: null,
  customerLoading: false,
  customerError: null,

  // ---- orders ----
  customerOrders: [],
  ordersPagination: null,
  ordersLoading: false,
  ordersError: null,

  // ---- reviews ----
  customerReviews: [],
  reviewsPagination: null,
  reviewsLoading: false,
  reviewsError: null,

  // ---- activities ----
  customerActivities: [],
  activitiesPagination: null,
  activitiesLoading: false,
  activitiesError: null,

  // ---- status update ----
  statusUpdating: false,
  statusUpdateError: null,

  getCustomers: async (params = {}) => {
    try {
      set({ customersLoading: true, customersError: null });

      const { data } = await api.get("/management/customers", { params });

      if (data.success) {
        set({
          customers: data.customers,
          analytics: data.analytics,
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

  getCustomerById: async (id) => {
    try {
      set({ customerLoading: true, customerError: null });

      const { data } = await api.get(`/management/customers/${id}`);

      if (data.success) {
        set({
          selectedCustomer: data.customer,
          customerStatistics: data.statistics,
          customerLoading: false,
        });
      }
    } catch (error) {
      set({
        customerLoading: false,
        customerError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load customer",
      });
    }
  },

  getCustomerOrders: async (id, params = {}) => {
    try {
      set({ ordersLoading: true, ordersError: null });

      const { data } = await api.get(`/management/customers/${id}/orders`, {
        params,
      });

      if (data.success) {
        set({
          customerOrders: data.orders,
          ordersPagination: data.pagination,
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

  getCustomerReviews: async (id, params = {}) => {
    try {
      set({ reviewsLoading: true, reviewsError: null });

      const { data } = await api.get(`/management/customers/${id}/reviews`, {
        params,
      });

      if (data.success) {
        set({
          customerReviews: data.reviews,
          reviewsPagination: data.pagination,
          reviewsLoading: false,
        });
      }
    } catch (error) {
      set({
        reviewsLoading: false,
        reviewsError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load reviews",
      });
    }
  },

  getCustomerActivities: async (id, params = {}) => {
    try {
      set({ activitiesLoading: true, activitiesError: null });

      const { data } = await api.get(
        `/management/customers/${id}/activities`,
        { params }
      );

      if (data.success) {
        set({
          customerActivities: data.activities,
          activitiesPagination: data.pagination,
          activitiesLoading: false,
        });
      }
    } catch (error) {
      set({
        activitiesLoading: false,
        activitiesError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load activities",
      });
    }
  },

  updateCustomerStatus: async (id, status, reason) => {
    try {
      set({ statusUpdating: true, statusUpdateError: null });

      const { data } = await api.patch(`/management/customers/${id}/status`, {
        status,
        reason,
      });

      if (data.success) {
        set((state) => ({
          statusUpdating: false,
          customers: state.customers.map((c) =>
            c._id === id
              ? { ...c, accountStatus: data.customer.accountStatus }
              : c
          ),
          selectedCustomer:
            state.selectedCustomer?._id === id
              ? {
                  ...state.selectedCustomer,
                  accountStatus: data.customer.accountStatus,
                  suspendedAt: data.customer.suspendedAt,
                  suspensionReason: data.customer.suspensionReason,
                }
              : state.selectedCustomer,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to update customer status";
      set({ statusUpdating: false, statusUpdateError: msg });
      return { success: false, message: msg };
    }
  },

  clearSelectedCustomer: () => {
    set({
      selectedCustomer: null,
      customerStatistics: null,
      customerOrders: [],
      ordersPagination: null,
      customerReviews: [],
      reviewsPagination: null,
      customerActivities: [],
      activitiesPagination: null,
    });
  },
}));