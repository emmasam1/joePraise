import { create } from "zustand";
import api from "@/api/axios";
import { message } from "antd";

export const useBusinessStore = create((set, get) => ({
  onboardingLoading: false,
   loading: false,
  businesses: [],
  selectedBusiness: null,

  onboardBusiness: async (formData, router) => {
    set({ onboardingLoading: true });

    console.log("🚀 ONBOARDING STARTED");
    console.log("📦 Form Data:", formData);

    try {
      const payload = new FormData();

      // REQUIRED
      payload.append("businessName", formData.businessName);
      payload.append("businessEmail", formData.businessEmail);
      payload.append("businessPhone", formData.businessPhone);
      payload.append("category", formData.category);
      payload.append("address", formData.address);
      payload.append("postalCode", formData.postalCode);
      payload.append("businessCountry", formData.businessCountry);
      payload.append("businessCity", formData.businessCity);

      // OPTIONAL TEXT FIELDS
      if (formData.description)
        payload.append("description", formData.description);

      if (formData.website)
        payload.append("website", formData.website);

      if (formData.instagram)
        payload.append("instagram", formData.instagram);

      if (formData.twitter)
        payload.append("twitter", formData.twitter);

      if (formData.facebook)
        payload.append("facebook", formData.facebook);

      // FILES
      if (formData.logo) {
        payload.append("logo", formData.logo);
        console.log("🖼️ Logo added");
      }

      if (formData.banner) {
        payload.append("banner", formData.banner);
        console.log("🖼️ Banner added");
      }

      if (formData.documents?.length > 0) {
        formData.documents.forEach((doc, i) => {
          payload.append("documents", doc);
          console.log(`📄 Document ${i + 1} added`);
        });
      }

      // DEBUG PAYLOAD
      console.log("📤 FINAL FORM DATA:");
      for (let pair of payload.entries()) {
        console.log("➡️", pair[0], pair[1]);
      }

      // API CALL (NO HEADERS NEEDED)
      const response = await api.post("/business/onboard", payload);

      console.log("📥 RESPONSE:", response.data);

      if (response.data.success) {
        message.success(
          response.data.message || "Business onboarded successfully"
        );

        console.log("✅ SUCCESS → Redirecting...");
        router.push("/business-verification");
      } else {
        console.warn("⚠️ API returned success=false", response.data);
      }

      return response.data;
    } catch (error) {
      console.error("❌ ONBOARDING FAILED:", error);
      console.error("📛 Backend Error:", error?.response?.data);

      message.error(
        error?.response?.data?.message ||
          "Failed to onboard business"
      );

      throw error;
    } finally {
      set({ onboardingLoading: false });
      console.log("🔄 LOADING RESET");
    }
  },


  fetchBusinesses: async (params = {}) => {
    set({ loading: true });

    try {
      const query = new URLSearchParams(params).toString();

      const res = await api.get(`/admin?${query}`);

      if (res.data.success) {
        set({ businesses: res.data.businesses });
      }

      return res.data;
    } catch (error) {
      message.error("Failed to load businesses");
      throw error;
    } finally {
      set({ loading: false });
    }
  },


  fetchBusiness: async (id) => {
    set({ loading: true });

    try {
      const res = await api.get(`/admin/${id}`);

      if (res.data.success) {
        set({ selectedBusiness: res.data.business });
      }

      return res.data;
    } catch (error) {
      message.error("Failed to load business profile");
      throw error;
    } finally {
      set({ loading: false });
    }
  },


  verifyBusiness: async (id, payload) => {
    try {
      const res = await api.patch(`/admin/${id}/verify`, payload);

      if (res.data.success) {
        message.success(res.data.message);

        // refresh list after update
        get().fetchBusinesses();
      }

      return res.data;
    } catch (error) {
      message.error("Verification failed");
      throw error;
    }
  },

}));