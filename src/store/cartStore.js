// import { create } from "zustand";
// import { message } from "antd";
// import api from "@/api/axios";
// import { getOrCreateGuestId } from "@/lib/guestId";

// export const useCartStore = create((set, get) => ({
//   cart: null,
//   cartLoading: false,

//   addToCart: async (payload) => {
//     set({ cartLoading: true });

//     try {
//       const res = await api.post("/cart/add", payload, {
//         headers: { "x-guest-id": getOrCreateGuestId() },
//       });

//       if (res.data.success) {
//         set({ cart: res.data.cart });
//         message.success("Added to cart successfully");
//       }

//       return res.data;
//     } catch (error) {
//       message.error(
//         error?.response?.data?.message || "Failed to add item to cart",
//       );
//       throw error;
//     } finally {
//       set({ cartLoading: false });
//     }
//   },

//   fetchCart: async () => {
//     set({ cartLoading: true });

//     try {
//       const res = await api.get("/cart", {
//         headers: { "x-guest-id": getOrCreateGuestId() },
//       });

//       if (res.data.success) {
//         set({ cart: res.data.cart });
//       }

//       return res.data;
//     } catch (error) {
//       throw error;
//     } finally {
//       set({ cartLoading: false });
//     }
//   },
// }));

import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";
import { getOrCreateGuestId } from "@/lib/guestId";

export const useCartStore = create((set, get) => ({
  cart: null,
  cartLoading: false,
  mutatingItemId: null,

  addToCart: async (payload) => {
    set({ cartLoading: true });

    try {
      const res = await api.post("/cart/add", payload, {
        headers: { "x-guest-id": getOrCreateGuestId() },
      });

      if (res.data.success) {
        set({ cart: res.data.cart });
        message.success("Added to cart successfully");
      }

      return res.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to add item to cart",
      );
      throw error;
    } finally {
      set({ cartLoading: false });
    }
  },

  fetchCart: async () => {
    set({ cartLoading: true });

    try {
      const res = await api.get("/cart", {
        headers: { "x-guest-id": getOrCreateGuestId() },
      });

      if (res.data.success) {
        set({ cart: res.data.cart });
      }

      return res.data;
    } catch (error) {
      throw error;
    } finally {
      set({ cartLoading: false });
    }
  },

  updateItemQuantity: async (itemId, quantity) => {
    set({ mutatingItemId: itemId });

    try {
      const res = await api.patch(
        `/cart/item/${itemId}`,
        { quantity },
        { headers: { "x-guest-id": getOrCreateGuestId() } },
      );

      if (res.data.success) {
        set({ cart: res.data.cart });
      }

      return res.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to update quantity",
      );
      throw error;
    } finally {
      set({ mutatingItemId: null });
    }
  },

  updateItemInstructions: async (itemId, instructions) => {
    set({ mutatingItemId: itemId });

    try {
      const res = await api.patch(
        `/cart/item/${itemId}/instructions`,
        { instructions },
        { headers: { "x-guest-id": getOrCreateGuestId() } },
      );

      if (res.data.success) {
        set({ cart: res.data.cart });
        message.success("Instructions updated");
      }

      return res.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to update instructions",
      );
      throw error;
    } finally {
      set({ mutatingItemId: null });
    }
  },

  removeItem: async (itemId) => {
    set({ mutatingItemId: itemId });

    try {
      const res = await api.delete(`/cart/item/${itemId}`, {
        headers: { "x-guest-id": getOrCreateGuestId() },
      });

      if (res.data.success) {
        set({ cart: res.data.cart });
        message.success("Item removed from cart");
      }

      return res.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to remove item",
      );
      throw error;
    } finally {
      set({ mutatingItemId: null });
    }
  },

  clearCart: async () => {
    try {
      const res = await api.delete("/cart/clear", {
        headers: { "x-guest-id": getOrCreateGuestId() },
      });

      if (res.data.success) {
        set({ cart: { items: [], totalAmount: 0 } });
      }

      return res.data;
    } catch (error) {
      message.error("Failed to clear cart");
      throw error;
    }
  },
}));