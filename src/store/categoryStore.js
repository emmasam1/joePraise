import { create } from "zustand";
import { message } from "antd";
import api from "@/api/axios";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  categoriesLoading: false,
  mutating: false,

  fetchCategories: async (type) => {
    set({ categoriesLoading: true });
    try {
      const res = await api.get("/category/admin", { params: { type } });
      if (res.data.success) {
        set({ categories: res.data.categories || [] });
      }
      return res.data;
    } catch (error) {
      message.error("Failed to load categories");
      throw error;
    } finally {
      set({ categoriesLoading: false });
    }
  },

  createCategory: async (formData) => {
    set({ mutating: true });
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      const res = await api.post("/category", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        message.success(res.data.message || "Category created");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to create category");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },

  updateCategory: async (categoryId, formData) => {
    set({ mutating: true });
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      const res = await api.patch(`/category/${categoryId}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        message.success(res.data.message || "Category updated");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to update category");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ mutating: true });
    try {
      const res = await api.delete(`/category/${categoryId}`);
      if (res.data.success) {
        message.success(res.data.message || "Category deleted");
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to delete category");
      throw error;
    } finally {
      set({ mutating: false });
    }
  },
}));