import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";

export const useProductManagementStore = create((set, get) => ({
  listings: [],
  listingsLoading: false,
  pagination: { total: 0, page: 1, limit: 10, pages: 0 },

  selectedListing: null,
  selectedListingLoading: false,
  ratingBreakdown: null,
  avgRating: 0,
  totalReviews: 0,
  reviews: [],

  mutating: false,

  fetchListings: async (params = {}) => {
    set({ listingsLoading: true });
    try {
      const res = await api.get("/admin/listings", { params });
      if (res.data.success) {
        set({
          listings: res.data.listings || [],
          pagination: res.data.pagination,
        });
      }
      return res.data;
    } catch (error) {
      message.error("Failed to load listings");
      throw error;
    } finally {
      set({ listingsLoading: false });
    }
  },

  fetchListingDetail: async (listingId) => {
    set({ selectedListingLoading: true });
    try {
      const res = await api.get(`/admin/listings/${listingId}`);
      if (res.data.success) {
        set({
          selectedListing: res.data.listing,
          ratingBreakdown: res.data.ratingBreakdown,
          avgRating: res.data.avgRating,
          totalReviews: res.data.totalReviews,
          reviews: res.data.reviews,
        });
      }
      return res.data;
    } catch (error) {
      message.error("Failed to load listing details");
      throw error;
    } finally {
      set({ selectedListingLoading: false });
    }
  },

  clearSelectedListing: () =>
    set({ selectedListing: null, ratingBreakdown: null, avgRating: 0, totalReviews: 0, reviews: [] }),

  banListing: async (listingId, reason) => {
    set({ mutating: true });
    try {
      const res = await api.patch(`/admin/listings/${listingId}/ban`, { reason });
      if (res.data.success) message.success(res.data.message);
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to ban listing");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },

  unbanListing: async (listingId) => {
    set({ mutating: true });
    try {
      const res = await api.patch(`/admin/listings/${listingId}/unban`);
      if (res.data.success) message.success(res.data.message);
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to unban listing");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },

  blockListing: async (listingId, reason) => {
    set({ mutating: true });
    try {
      const res = await api.patch(`/admin/listings/${listingId}/block`, { reason });
      if (res.data.success) message.success(res.data.message);
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to block listing");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },

  unblockListing: async (listingId) => {
    set({ mutating: true });
    try {
      const res = await api.patch(`/admin/listings/${listingId}/unblock`);
      if (res.data.success) message.success(res.data.message);
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to unblock listing");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },
}));