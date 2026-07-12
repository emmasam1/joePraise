import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";

export const useListingStore = create((set, get) => ({
  loading: false,
  services: [],
  selectedService: null,

  createService: async (formData) => {
    set({ loading: true });

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          payload.append(key, value);
        }
      });

      if (formData.images?.length) {
        formData.images.forEach((image) => {
          payload.append(
            "images",
            image.originFileObj || image
          );
        });
      }

      const res = await api.post(
        "/services",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success(
        res.data.message ||
        "Listing created successfully"
      );

      return res.data;

    } catch (error) {
      message.error(
        error?.response?.data?.message ||
        "Failed to create listing"
      );

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getMyServices: async () => {
    try {
      const res = await api.get("/services/mine");

      set({
        services: res.data.services || [],
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getAllservices: async () => {
    try {
      const res = await api.get("/services");
      console.log(res)
      set({
        services: res.data.services || [],
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}));