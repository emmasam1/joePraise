import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";
import { getOrCreateGuestId } from "@/lib/guestId";

export const useCartStore = create((set, get) => ({
  cart: null,
  cartLoading: false,

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
}));