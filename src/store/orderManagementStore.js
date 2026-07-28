import { create } from "zustand";
import api from "@/api/axios";

export const useOrderManagementStore = create((set, get) => ({
  // ---- orders list + stats ----
  orders: [],
  stats: null,
  pagination: null,
  filters: null,
  ordersLoading: false,
  ordersError: null,

  // ---- single order detail ----
  selectedOrder: null,
  orderLoading: false,
  orderError: null,

  // ---- force cancel ----
  forceCancelling: false,
  forceCancelError: null,

  // ---- dispute review ----
  disputeOrder: null, // the order object returned alongside the dispute
  dispute: null,
  chatHistory: null,
  disputeLoading: false,
  disputeError: null,
  disputeNotFound: false, // true when no active dispute exists yet for this order

  // ---- dispute mutations (open/refund/warn/suspend/message) ----
  disputeActionLoading: false,
  disputeActionError: null,

  getOrders: async (params = {}) => {
    try {
      set({ ordersLoading: true, ordersError: null });

      const { data } = await api.get("/management/orders", { params });

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

  getOrderById: async (orderId) => {
    try {
      set({ orderLoading: true, orderError: null });

      const { data } = await api.get(`/management/orders/${orderId}`);

      if (data.success) {
        set({ selectedOrder: data.order, orderLoading: false });
      }
    } catch (error) {
      set({
        orderLoading: false,
        orderError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load order",
      });
    }
  },

  forceCancelOrder: async (orderId, reason) => {
    try {
      set({ forceCancelling: true, forceCancelError: null });

      const { data } = await api.patch(
        `/management/orders/${orderId}/force-cancel`,
        { reason },
      );

      if (data.success) {
        set((state) => ({
          forceCancelling: false,
          orders: state.orders.map((o) =>
            o._id === orderId ? { ...o, orderStatus: "cancelled" } : o,
          ),
          selectedOrder:
            state.selectedOrder?._id === orderId
              ? { ...state.selectedOrder, orderStatus: "cancelled", canForceCancel: false }
              : state.selectedOrder,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to force-cancel order";
      set({ forceCancelling: false, forceCancelError: msg });
      return { success: false, message: msg };
    }
  },

  // Fetches the dispute review screen for an order. If no dispute exists
  // yet, sets disputeNotFound so the page can render the "open dispute" form.
  getDisputeReview: async (orderId) => {
    try {
      set({
        disputeLoading: true,
        disputeError: null,
        disputeNotFound: false,
      });

      const { data } = await api.get(`/management/orders/${orderId}/dispute`);

      if (data.success) {
        set({
          disputeOrder: data.order,
          dispute: data.dispute,
          chatHistory: data.chatHistory,
          disputeLoading: false,
        });
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message || error.message;

      if (status === 404 && msg?.toLowerCase().includes("no active dispute")) {
        set({ disputeLoading: false, disputeNotFound: true });
      } else {
        set({
          disputeLoading: false,
          disputeError: msg || "Failed to load dispute",
        });
      }
    }
  },

  openDispute: async (orderId, complaint) => {
    try {
      set({ disputeActionLoading: true, disputeActionError: null });

      const { data } = await api.post(`/management/orders/${orderId}/dispute`, {
        complaint,
      });

      if (data.success) {
        set({ disputeActionLoading: false });
        // Refetch the full review payload (order + dispute) now that it exists.
        await get().getDisputeReview(orderId);
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to open dispute";
      set({ disputeActionLoading: false, disputeActionError: msg });
      return { success: false, message: msg };
    }
  },

  refundDisputeCustomer: async (disputeId) => {
    try {
      set({ disputeActionLoading: true, disputeActionError: null });

      const { data } = await api.patch(`/management/disputes/${disputeId}/refund`);

      if (data.success) {
        set((state) => ({
          disputeActionLoading: false,
          dispute: state.dispute ? { ...state.dispute, ...data.dispute } : data.dispute,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to refund customer";
      set({ disputeActionLoading: false, disputeActionError: msg });
      return { success: false, message: msg };
    }
  },

  warnDisputeBusiness: async (disputeId, message) => {
    try {
      set({ disputeActionLoading: true, disputeActionError: null });

      const { data } = await api.patch(`/management/disputes/${disputeId}/warn`, {
        message,
      });

      if (data.success) {
        set((state) => ({
          disputeActionLoading: false,
          dispute: state.dispute ? { ...state.dispute, ...data.dispute } : data.dispute,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to warn business";
      set({ disputeActionLoading: false, disputeActionError: msg });
      return { success: false, message: msg };
    }
  },

  suspendDisputeBusiness: async (disputeId, reason) => {
    try {
      set({ disputeActionLoading: true, disputeActionError: null });

      const { data } = await api.patch(`/management/disputes/${disputeId}/suspend`, {
        reason,
      });

      if (data.success) {
        set((state) => ({
          disputeActionLoading: false,
          dispute: state.dispute ? { ...state.dispute, ...data.dispute } : data.dispute,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to suspend business";
      set({ disputeActionLoading: false, disputeActionError: msg });
      return { success: false, message: msg };
    }
  },

  sendDisputeMessage: async (disputeId, message, recipient = "customer") => {
    try {
      set({ disputeActionLoading: true, disputeActionError: null });

      const { data } = await api.post(`/management/disputes/${disputeId}/message`, {
        message,
        recipient,
      });

      set({ disputeActionLoading: false });
      return { success: data.success, message: data.message };
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to send message";
      set({ disputeActionLoading: false, disputeActionError: msg });
      return { success: false, message: msg };
    }
  },

  clearSelectedOrder: () => set({ selectedOrder: null }),

  clearDisputeReview: () =>
    set({
      disputeOrder: null,
      dispute: null,
      chatHistory: null,
      disputeNotFound: false,
      disputeError: null,
    }),
}));