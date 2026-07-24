import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";

export const usePlatformSettingsStore = create((set, get) => ({
  commissionRates: null,
  commissionLoading: false,
  commissionSaving: false,
  lastUpdatedAt: null,
  lastUpdatedBy: null,

  fetchCommissionRates: async () => {
    set({ commissionLoading: true });
    try {
      const res = await api.get("/platform/commission-rates");
      if (res.data.success) {
        set({
          commissionRates: res.data.commissionRates,
          lastUpdatedAt: res.data.updatedAt,
          lastUpdatedBy: res.data.updatedBy,
        });
      }
      return res.data;
    } catch (error) {
      message.error("Failed to load commission rates");
      throw error;
    } finally {
      set({ commissionLoading: false });
    }
  },

  // Updates a single rate (or a subset) — backend supports partial updates,
  // so each of the three inputs can save independently.
  updateCommissionRates: async (partialRates) => {
    set({ commissionSaving: true });
    try {
      const res = await api.patch("/platform/commission-rates", partialRates);
      if (res.data.success) {
        set({
          commissionRates: res.data.commissionRates,
          lastUpdatedAt: res.data.updatedAt,
          lastUpdatedBy: res.data.updatedBy,
        });
        message.success(res.data.message || "Commission rate updated");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to update commission rate");
      throw error;
    } finally {
      set({ commissionSaving: false });
    }
  },
}));