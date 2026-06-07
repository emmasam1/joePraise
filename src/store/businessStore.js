
import { create } from "zustand";
import api from "@/api/axios";
import { message } from "antd";
import { useAuthStore } from "@/store/authStore";

const hasValue = (value) => {
  return value !== undefined && value !== null && String(value).trim() !== "";
};

const appendIfPresent = (payload, key, value) => {
  if (hasValue(value)) {
    payload.append(key, value);
  }
};

const normalizeFile = (file) => {
  return file?.originFileObj || file;
};

export const useBusinessStore = create((set, get) => ({
  onboardingLoading: false,
  loading: false,
  businesses: [],
  selectedBusiness: null,

  onboardBusiness: async (formData, router) => {
    set({ onboardingLoading: true });

    try {
      const payload = new FormData();

      // ACCOUNT FIELDS - REQUIRED ONLY WHEN THE USER IS NOT LOGGED IN
      appendIfPresent(payload, "name", formData.name);
      appendIfPresent(payload, "email", formData.email);
      appendIfPresent(payload, "phoneNumber", formData.phoneNumber);
      appendIfPresent(payload, "password", formData.password);
      appendIfPresent(payload, "referredByCode", formData.referredByCode);

      // REQUIRED BUSINESS FIELDS
      payload.append("businessName", formData.businessName || "");
      payload.append("businessEmail", formData.businessEmail || "");
      payload.append("businessPhone", formData.businessPhone || "");
      payload.append("category", formData.category || "");
      payload.append("address", formData.address || "");
      payload.append("postalCode", formData.postalCode || "");
      payload.append("businessCountry", formData.businessCountry || "");
      payload.append("businessCity", formData.businessCity || "");

      // OPTIONAL TEXT FIELDS
      appendIfPresent(payload, "businessState", formData.businessState);
      appendIfPresent(payload, "description", formData.description);
      appendIfPresent(payload, "website", formData.website);
      appendIfPresent(payload, "instagram", formData.instagram);
      appendIfPresent(payload, "twitter", formData.twitter);
      appendIfPresent(payload, "facebook", formData.facebook);
      appendIfPresent(payload, "mapLink", formData.mapLink);
      appendIfPresent(payload, "direction", formData.direction);
      appendIfPresent(payload, "docType", formData.docType || "CAC");

      if (Array.isArray(formData.operatingHours)) {
        payload.append(
          "operatingHours",
          JSON.stringify(formData.operatingHours),
        );
      }

      // FILES
      if (formData.logo) {
        payload.append("logo", normalizeFile(formData.logo));
      }

      if (formData.banner) {
        payload.append("banner", normalizeFile(formData.banner));
      }

      const documents =
        formData.documents?.length > 0
          ? formData.documents
          : [
              formData.businessCert,
              formData.businessLicense,
              formData.taxCertificate,
              formData.proofOfAddress,
            ].filter(Boolean);

      documents.forEach((doc) => {
        payload.append("documents", normalizeFile(doc));
      });

      const response = await api.post("/business/onboard", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const authStore = useAuthStore.getState();

        /**
         * NEW USER
         */
        if (response.data.requiresVerification) {
          message.success(response.data.message);

          router.push(
            `/verification-code?email=${encodeURIComponent(
              response.data.email
            )}&type=registration`
          );

          return response.data;
        }

        /**
         * EXISTING AUTHENTICATED USER
         */
        const {
          user,
          accessToken,
          refreshToken,
        } = response.data;

        if (user && accessToken) {
          authStore.setLoginSuccess(
            user,
            accessToken,
            refreshToken
          );
        }

        message.success(
          response.data.message ||
            "Business onboarded successfully"
        );

        router.push("/dashboard");
      }

      return response.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to onboard business",
      );

      throw error;
    } finally {
      set({ onboardingLoading: false });
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