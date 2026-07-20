import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";

export const useAddressStore = create((set, get) => ({
  addresses: [],
  addressLoading: false,
  addressMutating: false,

  fetchAddresses: async () => {
    set({ addressLoading: true });
    try {
      const res = await api.get("/addresses");
      if (res.data.success) {
        set({ addresses: res.data.addresses || [] });
      }
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      set({ addressLoading: false });
    }
  },

  addAddress: async (payload) => {
    set({ addressMutating: true });
    try {
      const res = await api.post("/addresses", payload);
      if (res.data.success) {
        set({ addresses: res.data.addresses });
        message.success("Address added");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to add address");
      throw error;
    } finally {
      set({ addressMutating: false });
    }
  },

  updateAddress: async (addressId, payload) => {
    set({ addressMutating: true });
    try {
      const res = await api.patch(`/addresses/${addressId}`, payload);
      if (res.data.success) {
        set({ addresses: res.data.addresses });
        message.success("Address updated");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to update address");
      throw error;
    } finally {
      set({ addressMutating: false });
    }
  },

  deleteAddress: async (addressId) => {
    set({ addressMutating: true });
    try {
      const res = await api.delete(`/addresses/${addressId}`);
      if (res.data.success) {
        set({ addresses: res.data.addresses });
        message.success("Address deleted");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to delete address");
      throw error;
    } finally {
      set({ addressMutating: false });
    }
  },
}));