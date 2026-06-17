
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

  // STEP 1: Register Initial Personal Details (Unauthenticated Guest Flow)
  registerInitialUser: async (accountData, router) => {
    set({ onboardingLoading: true });
    try {
      const response = await api.post("/business/register-initial", accountData);

      if (response.data.success && response.data.requiresVerification) {
        message.success(response.data.message);
        
        // Push to OTP layout along with email query params
        router.push(
          `/verification-code?email=${encodeURIComponent(
            response.data.email
          )}&type=registration`
        );
      }
      return response.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Account registration failed"
      );
      throw error;
    } finally {
      set({ onboardingLoading: false });
    }
  },

  // STEP 3: Complete Business Onboarding (Authenticated Users Only)
  onboardBusiness: async (formData, router) => {
    set({ onboardingLoading: true });

    try {
      const payload = new FormData();

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

      // BRANDING FILES
      if (formData.logo) {
        payload.append("logo", normalizeFile(formData.logo));
      }

      if (formData.banner) {
        payload.append("banner", normalizeFile(formData.banner));
      }

      // VERIFICATION DOCUMENTS
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
        const { user, accessToken, refreshToken } = response.data;

        if (user && accessToken) {
          authStore.setLoginSuccess(
            user,
            accessToken,
            refreshToken
          );
        }

        message.success(
          response.data.message || "Business onboarded successfully"
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

  // ADMIN / MANAGEMENT UTILITIES
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

        if (get().selectedBusiness) {
          set({
            selectedBusiness: {
              ...get().selectedBusiness,
              verificationStatus: res.data.business.verificationStatus,
              verificationStage: res.data.business.verificationStage,
              verifiedAt: res.data.business.verifiedAt,
              rejectionReason: res.data.business.rejectionReason,
            },
          });
        }

        await get().fetchBusiness(id);
        await get().fetchBusinesses();
      }

      return res.data;
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Verification failed"
      );
      throw error;
    }
  },
}));