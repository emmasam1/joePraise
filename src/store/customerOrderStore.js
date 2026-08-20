
import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";

export const useCustomerOrderStore = create((set) => ({
  // ---- overview page (stats + recent orders + charts) ----
  overviewStats: null,
  overviewStatsChange: null,
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

  // ---- single order (view / tracking pages) ----
  selectedOrder: null,
  orderLoading: false,
  orderError: null,
  reviewLoading: false,

  getOverview: async () => {
    try {
      set({ overviewLoading: true, overviewError: null });

      const { data } = await api.get("/orders/my-orders/overview");

      if (data.success) {
        set({
          overviewStats: data.stats,
          overviewStatsChange: data.statsChange,
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

  getOrderById: async (orderId) => {
    try {
      set({ orderLoading: true, orderError: null });

      const { data } = await api.get(`/orders/${orderId}`);

      if (data.success) {
        set({ selectedOrder: data.order, orderLoading: false });
      }
    } catch (error) {
      set({
        orderLoading: false,
        orderError:
          error?.response?.data?.message ||
          error.message ||
          "Failed to load this order",
      });
    }
  },

  submitOrderReview: async ({
    orderId,
    orderItemId,
    listingId,
    rating,
    title,
    comment,
  }) => {
    try {
      set({ reviewLoading: true });

      const { data } = await api.post("/reviews", {
        reviewTargetModel: "Listing",
        reviewTarget: listingId,
        orderId,
        orderItemId,
        rating,
        title,
        comment,
      });

      if (data.success) {
        set((state) => ({
          selectedOrder: state.selectedOrder
            ? {
                ...state.selectedOrder,
                items: (state.selectedOrder.items || []).map((item) =>
                  item._id === orderItemId
                    ? { ...item, isReviewed: true, review: data.review }
                    : item,
                ),
              }
            : state.selectedOrder,
        }));
        message.success(data.message || "Review submitted successfully");
      }

      return data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to submit your review",
      );
      throw error;
    } finally {
      set({ reviewLoading: false });
    }
  },
}));
