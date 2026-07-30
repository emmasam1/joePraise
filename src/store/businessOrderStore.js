


// import { create } from "zustand";
// import api from "@/api/axios";

// export const useBusinessOrderStore = create((set) => ({
//   // ---- orders list + stats ----
//   orders: [],
//   stats: null,
//   business: null,
//   pagination: null,
//   filters: null,
//   ordersLoading: false,
//   ordersError: null,

//   // ---- single order detail ----
//   selectedOrder: null,
//   orderLoading: false,
//   orderError: null,

//   // ---- accept / reject mutations ----
//   actionLoading: false,
//   actionError: null,

//   getOrders: async (params = {}) => {
//     try {
//       set({ ordersLoading: true, ordersError: null });

//       const { data } = await api.get("/orders/business/all", { params });

//       if (data.success) {
//         set({
//           orders: data.orders,
//           stats: data.stats,
//           business: data.business,
//           pagination: data.pagination,
//           filters: data.filters,
//           ordersLoading: false,
//         });
//       }
//     } catch (error) {
//       set({
//         ordersLoading: false,
//         ordersError:
//           error?.response?.data?.message ||
//           error.message ||
//           "Failed to load orders",
//       });
//     }
//   },

//   getOrderById: async (orderId) => {
//     try {
//       set({ orderLoading: true, orderError: null });

//       const { data } = await api.get(`/orders/${orderId}`);

//       if (data.success) {
//         set({ selectedOrder: data.order, orderLoading: false });
//       }
//     } catch (error) {
//       set({
//         orderLoading: false,
//         orderError:
//           error?.response?.data?.message ||
//           error.message ||
//           "Failed to load order",
//       });
//     }
//   },

//   // NOTE: acceptOrder/rejectOrder are now PER-BUSINESS on the backend —
//   // they only ever affect this business's own items on the order, never
//   // a co-seller's. We optimistically update `myStatus` (not `orderStatus`,
//   // which reflects the whole shared order across every business on it).
//   acceptOrder: async (orderId) => {
//     try {
//       set({ actionLoading: true, actionError: null });

//       const { data } = await api.patch(`/orders/${orderId}/accept`);

//       if (data.success) {
//         set((state) => ({
//           actionLoading: false,
//           orders: state.orders.map((o) =>
//             o._id === orderId ? { ...o, myStatus: "accepted" } : o,
//           ),
//           selectedOrder:
//             state.selectedOrder?._id === orderId
//               ? { ...state.selectedOrder, myStatus: "accepted" }
//               : state.selectedOrder,
//         }));
//         return { success: true, message: data.message };
//       }
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         error.message ||
//         "Failed to accept order";
//       set({ actionLoading: false, actionError: msg });
//       return { success: false, message: msg };
//     }
//   },

//   rejectOrder: async (orderId, reason) => {
//     try {
//       set({ actionLoading: true, actionError: null });

//       const { data } = await api.patch(`/orders/${orderId}/reject`, { reason });

//       if (data.success) {
//         set((state) => ({
//           actionLoading: false,
//           orders: state.orders.map((o) =>
//             o._id === orderId ? { ...o, myStatus: "cancelled" } : o,
//           ),
//           selectedOrder:
//             state.selectedOrder?._id === orderId
//               ? { ...state.selectedOrder, myStatus: "cancelled" }
//               : state.selectedOrder,
//         }));
//         return { success: true, message: data.message };
//       }
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         error.message ||
//         "Failed to reject order";
//       set({ actionLoading: false, actionError: msg });
//       return { success: false, message: msg };
//     }
//   },

//   clearSelectedOrder: () => set({ selectedOrder: null }),
// }));

import { create } from "zustand";
import api from "@/api/axios";

export const useBusinessOrderStore = create((set) => ({
  // ---- orders list + stats ----
  orders: [],
  stats: null,
  business: null,
  pagination: null,
  filters: null,
  ordersLoading: false,
  ordersError: null,

  // ---- single order detail ----
  selectedOrder: null,
  orderLoading: false,
  orderError: null,

  // ---- accept / reject mutations ----
  actionLoading: false,
  actionError: null,

  getOrders: async (params = {}) => {
    try {
      set({ ordersLoading: true, ordersError: null });

      const { data } = await api.get("/orders/business/all", { params });

      if (data.success) {
        set({
          orders: data.orders,
          stats: data.stats,
          business: data.business,
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
          "Failed to load order",
      });
    }
  },

  // NOTE: acceptOrder/rejectOrder are now PER-BUSINESS on the backend —
  // they only ever affect this business's own items on the order, never
  // a co-seller's. We optimistically update `myStatus` (not `orderStatus`,
  // which reflects the whole shared order across every business on it).
  acceptOrder: async (orderId) => {
    try {
      set({ actionLoading: true, actionError: null });

      const { data } = await api.patch(`/orders/${orderId}/accept`);

      if (data.success) {
        set((state) => ({
          actionLoading: false,
          orders: state.orders.map((o) =>
            o._id === orderId ? { ...o, myStatus: "accepted" } : o,
          ),
          selectedOrder:
            state.selectedOrder?._id === orderId
              ? { ...state.selectedOrder, myStatus: "accepted" }
              : state.selectedOrder,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to accept order";
      set({ actionLoading: false, actionError: msg });
      return { success: false, message: msg };
    }
  },

  rejectOrder: async (orderId, reason) => {
    try {
      set({ actionLoading: true, actionError: null });

      const { data } = await api.patch(`/orders/${orderId}/reject`, { reason });

      if (data.success) {
        set((state) => ({
          actionLoading: false,
          orders: state.orders.map((o) =>
            o._id === orderId ? { ...o, myStatus: "cancelled" } : o,
          ),
          selectedOrder:
            state.selectedOrder?._id === orderId
              ? { ...state.selectedOrder, myStatus: "cancelled" }
              : state.selectedOrder,
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to reject order";
      set({ actionLoading: false, actionError: msg });
      return { success: false, message: msg };
    }
  },

  // Updates a single item's fulfillment status (e.g. processing -> shipped
  // -> delivered -> completed). Refetches the order afterward rather than
  // hand-merging the response, since orderStatus/timeline also change as
  // a side effect on the backend and we want the canonical result.
  updateItemStatus: async (orderId, itemId, itemStatus) => {
    try {
      set({ actionLoading: true, actionError: null });

      const { data } = await api.patch(
        `/orders/${orderId}/items/${itemId}/status`,
        { itemStatus },
      );

      if (data.success) {
        set({ actionLoading: false });
        return { success: true, message: data.message };
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to update item status";
      set({ actionLoading: false, actionError: msg });
      return { success: false, message: msg };
    }
  },

  clearSelectedOrder: () => set({ selectedOrder: null }),
}));