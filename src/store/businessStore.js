

// import { create } from "zustand";
// import api from "@/api/axios";
// import { message } from "antd";
// import { useAuthStore } from "@/store/authStore";

// const hasValue = (value) => {
//   return value !== undefined && value !== null && String(value).trim() !== "";
// };

// const appendIfPresent = (payload, key, value) => {
//   if (hasValue(value)) {
//     payload.append(key, value);
//   }
// };

// const normalizeFile = (file) => {
//   return file?.originFileObj || file;
// };

// export const useBusinessStore = create((set, get) => ({
//   onboardingLoading: false,
//   loading: false,
//   businesses: [],
//   selectedBusiness: null,

//   // STEP 1: Register Initial Personal Details (Unauthenticated Guest Flow)
//   registerInitialUser: async (accountData, router) => {
//     set({ onboardingLoading: true });
//     try {
//       const response = await api.post("/business/register-initial", accountData);

//       if (response.data.success && response.data.requiresVerification) {
//         message.success(response.data.message);
        
//         // Push to OTP layout along with email query params
//         router.push(
//           `/verification-code?email=${encodeURIComponent(
//             response.data.email
//           )}&type=registration`
//         );
//       }
//       return response.data;
//     } catch (error) {
//       message.error(
//         error?.response?.data?.message || "Account registration failed"
//       );
//       throw error;
//     } finally {
//       set({ onboardingLoading: false });
//     }
//   },

//   // STEP 3: Complete Business Onboarding (Authenticated Users Only)
//   onboardBusiness: async (formData, router) => {
//     set({ onboardingLoading: true });

//     try {
//       const payload = new FormData();

//       // REQUIRED BUSINESS FIELDS
//       payload.append("businessName", formData.businessName || "");
//       payload.append("businessEmail", formData.businessEmail || "");
//       payload.append("businessPhone", formData.businessPhone || "");

//       // NEW: category is now an array of Category _ids — send as JSON string
//       // so the backend's JSON.parse(category) handling picks it up correctly.
//       payload.append(
//         "category",
//         JSON.stringify(
//           Array.isArray(formData.category) ? formData.category : [],
//         ),
//       );

//       payload.append("address", formData.address || "");
//       payload.append("postalCode", formData.postalCode || "");
//       payload.append("businessCountry", formData.businessCountry || "");
//       payload.append("businessCity", formData.businessCity || "");

//       // OPTIONAL TEXT FIELDS
//       appendIfPresent(payload, "businessState", formData.businessState);
//       appendIfPresent(payload, "description", formData.description);
//       appendIfPresent(payload, "website", formData.website);
//       appendIfPresent(payload, "instagram", formData.instagram);
//       appendIfPresent(payload, "twitter", formData.twitter);
//       appendIfPresent(payload, "facebook", formData.facebook);
//       appendIfPresent(payload, "mapLink", formData.mapLink);
//       appendIfPresent(payload, "direction", formData.direction);

//       if (Array.isArray(formData.operatingHours)) {
//         payload.append(
//           "operatingHours",
//           JSON.stringify(formData.operatingHours),
//         );
//       }

//       // BRANDING FILES
//       if (formData.logo) {
//         payload.append("logo", normalizeFile(formData.logo));
//       }

//       if (formData.banner) {
//         payload.append("banner", normalizeFile(formData.banner));
//       }

//       const documentEntries = [
//           {
//             file: formData.businessCert,
//             type: formData.businessCertType,
//           },
//           {
//             file: formData.businessLicense,
//             type: formData.businessLicenseType,
//           },
//           {
//             file: formData.taxCertificate,
//             type: formData.taxCertificateType,
//           },
//           {
//             file: formData.proofOfAddress,
//             type: formData.proofOfAddressType,
//           },
//         ].filter((doc) => doc.file);

//         const docTypes = [];

//        documentEntries.forEach((doc) => {
//             payload.append(
//               "documents",
//               normalizeFile(doc.file)
//             );

//             docTypes.push(doc.type);
//           });

//           payload.append(
//             "docTypes",
//             JSON.stringify(docTypes)
//           );

//       const response = await api.post("/business/onboard", payload, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data.success) {
//         const authStore = useAuthStore.getState();
//         const { user, accessToken, refreshToken } = response.data;

//         if (user && accessToken) {
//           authStore.setLoginSuccess(
//             user,
//             accessToken,
//             refreshToken
//           );
//         }

//         message.success(
//           response.data.message || "Business onboarded successfully"
//         );

//         router.push("/dashboard");
//       }

//       return response.data;
//     } catch (error) {
//       message.error(
//         error?.response?.data?.message || "Failed to onboard business",
//       );
//       throw error;
//     } finally {
//       set({ onboardingLoading: false });
//     }
//   },

//   // NEW: Fetch business categories for the onboarding dropdown
//   fetchBusinessCategories: async () => {
//     try {
//       const res = await api.get("/category", {
//         params: { type: "business" },
//       });

//       if (res.data.success) {
//         return res.data.categories || [];
//       }

//       return [];
//     } catch (error) {
//       message.error("Failed to load business categories");
//       return [];
//     }
//   },

//   // ADMIN / MANAGEMENT UTILITIES
//   fetchBusinesses: async (params = {}) => {
//     set({ loading: true });

//     try {
//       const query = new URLSearchParams(params).toString();
//       const res = await api.get(`/admin?${query}`);

//       if (res.data.success) {
//         set({ businesses: res.data.businesses });
//       }

//       return res.data;
//     } catch (error) {
//       message.error("Failed to load businesses");
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   fetchBusiness: async (id) => {
//     set({ loading: true });

//     try {
//       const res = await api.get(`/admin/${id}`);

//       if (res.data.success) {
//         set({ selectedBusiness: res.data.business });
//       }

//       return res.data;
//     } catch (error) {
//       message.error("Failed to load business profile");
//       throw error;
//     } finally {
//       set({ loading: false });
//     }
//   },

// reviewBusinessDocument: async (businessId, documentId, payload) => {
//   try {
//     const res = await api.patch(
//       `/admin/${businessId}/documents/${documentId}/review`,
//       payload,
//     );

//     if (res.data.success) {
//       message.success(res.data.message);

//       const current = get().selectedBusiness;

//       if (current) {
//         set({
//           selectedBusiness: {
//             ...current,
//             verificationStatus:
//               res.data.business?.verificationStatus ||
//               current.verificationStatus,
//             verificationStage:
//               res.data.business?.verificationStage ||
//               current.verificationStage,
//             documents: res.data.business?.documents || current.documents,
//             documentReviewSummary:
//               res.data.business?.documentReviewSummary ||
//               current.documentReviewSummary,
//             timeline: res.data.business?.timeline || current.timeline,
//           },
//         });
//       }

//       await get().fetchBusiness(businessId);
//       await get().fetchBusinesses();
//     }

//     return res.data;
//   } catch (error) {
//     message.error(
//       error?.response?.data?.message || "Document review failed",
//     );
//     throw error;
//   }
// },

// verifyBusiness: async (id, payload) => {
//   try {
//     const res = await api.patch(`/admin/${id}/verify`, payload);

//     if (res.data.success) {
//       message.success(res.data.message);

//       const current = get().selectedBusiness;

//       if (current) {
//         set({
//           selectedBusiness: {
//             ...current,
//             verificationStatus:
//               res.data.business?.verificationStatus ||
//               current.verificationStatus,
//             verificationStage:
//               res.data.business?.verificationStage ||
//               current.verificationStage,
//             verifiedAt: res.data.business?.verifiedAt,
//             rejectionReason: res.data.business?.rejectionReason,
//             documents: res.data.business?.documents || current.documents,
//             documentReviewSummary:
//               res.data.business?.documentReviewSummary ||
//               current.documentReviewSummary,
//             timeline: res.data.business?.timeline || current.timeline,
//           },
//         });
//       }

//       await get().fetchBusiness(id);
//       await get().fetchBusinesses();
//     }

//     return res.data;
//   } catch (error) {
//     message.error(
//       error?.response?.data?.message || "Verification failed",
//     );
//     throw error;
//   }
// },

// }));

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

  // ============================================================
  // NEW: PUBLIC DISCOVERY STATE (Landing / Category / Profile pages)
  // ============================================================
  publicCategories: [],
  publicCategoriesLoading: true,   // was false

  newListings: [],
  newListingsLoading: true,

  popularListings: [],
  popularListingsLoading: true,    // was false

  searchResults: [],
  searchLoading: false,

  categoryBusinesses: [],
  categoryInfo: null,
  categoryPagination: { total: 0, page: 1, limit: 10, pages: 0 },
  categoryLoading: false,

  publicBusinessProfile: null,
  publicListings: { services: [], physicalProducts: [], digitalProducts: [] },
  publicRatingBreakdown: null,
  publicProfileLoading: false,


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

      payload.append(
        "category",
        JSON.stringify(
          Array.isArray(formData.category) ? formData.category : [],
        ),
      );

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

      if (Array.isArray(formData.operatingHours)) {
        payload.append(
          "operatingHours",
          JSON.stringify(formData.operatingHours),
        );
      }

      if (formData.logo) {
        payload.append("logo", normalizeFile(formData.logo));
      }

      if (formData.banner) {
        payload.append("banner", normalizeFile(formData.banner));
      }

      const documentEntries = [
          { file: formData.businessCert, type: formData.businessCertType },
          { file: formData.businessLicense, type: formData.businessLicenseType },
          { file: formData.taxCertificate, type: formData.taxCertificateType },
          { file: formData.proofOfAddress, type: formData.proofOfAddressType },
        ].filter((doc) => doc.file);

        const docTypes = [];

       documentEntries.forEach((doc) => {
            payload.append("documents", normalizeFile(doc.file));
            docTypes.push(doc.type);
          });

          payload.append("docTypes", JSON.stringify(docTypes));

      const response = await api.post("/business/onboard", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        const authStore = useAuthStore.getState();
        const { user, accessToken, refreshToken } = response.data;

        if (user && accessToken) {
          authStore.setLoginSuccess(user, accessToken, refreshToken);
        }

        message.success(response.data.message || "Business onboarded successfully");
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

  // Fetch business categories for the onboarding dropdown
  fetchBusinessCategories: async () => {
    try {
      const res = await api.get("/category", { params: { type: "business" } });
      if (res.data.success) return res.data.categories || [];
      return [];
    } catch (error) {
      message.error("Failed to load business categories");
      return [];
    }
  },

  // ============================================================
  // NEW: PUBLIC DISCOVERY FUNCTIONS
  // ============================================================

  // Nested (parent + subCategories) business categories — used by the
  // landing page icon grid and the category filter page's sidebar.
  fetchPublicCategories: async () => {
    set({ publicCategoriesLoading: true });
    try {
      const res = await api.get("/category", { params: { type: "business" } });
      if (res.data.success) {
        set({ publicCategories: res.data.categories || [] });
      }
      return res.data;
    } catch (error) {
      message.error("Failed to load categories");
      throw error;
    } finally {
      set({ publicCategoriesLoading: false });
    }
  },

  fetchNewListings: async () => {
    set({ newListingsLoading: true });
    try {
      const res = await api.get("/business/new-listings");
      if (res.data.success) set({ newListings: res.data.businesses || [] });
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      set({ newListingsLoading: false });
    }
  },

  fetchPopularListings: async () => {
    set({ popularListingsLoading: true });
    try {
      const res = await api.get("/business/popular");
      if (res.data.success) set({ popularListings: res.data.businesses || [] });
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      set({ popularListingsLoading: false });
    }
  },

  searchBusinessesPublic: async (params = {}) => {
    set({ searchLoading: true });
    try {
      const res = await api.get("/business/search", { params });
      if (res.data.success) set({ searchResults: res.data.businesses || [] });
      return res.data;
    } catch (error) {
      message.error("Search failed");
      throw error;
    } finally {
      set({ searchLoading: false });
    }
  },

  fetchBusinessesByCategory: async (slug, params = {}) => {
    set({ categoryLoading: true });
    try {
      const res = await api.get(`/business/category/${slug}`, { params });
      if (res.data.success) {
        set({
          categoryBusinesses: res.data.businesses || [],
          categoryInfo: res.data.category || null,
          categoryPagination: res.data.pagination || { total: 0, page: 1, limit: 10, pages: 0 },
        });
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to load category");
      throw error;
    } finally {
      set({ categoryLoading: false });
    }
  },

  fetchPublicBusinessProfile: async (businessId) => {
    set({ publicProfileLoading: true, publicBusinessProfile: null });
    try {
      const res = await api.get(`/business/${businessId}/profile`);
      if (res.data.success) {
        set({
          publicBusinessProfile: res.data.business,
          publicListings: res.data.listings || { services: [], physicalProducts: [], digitalProducts: [] },
          publicRatingBreakdown: res.data.ratingBreakdown || null,
        });
      }
      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to load business profile");
      throw error;
    } finally {
      set({ publicProfileLoading: false });
    }
  },

//   fetchPublicBusinessProfile_2: async (slug, businessId) => {
//     set({ publicProfileLoading: true, publicBusinessProfile: null });

//     try {
//       const res = await api.get(`/business/${slug}/${businessId}/profile`);

//       if (res.data.success) {
//         set({
//           publicBusinessProfile: res.data.business,
//           publicListings: res.data.listings || { services: [], physicalProducts: [], digitalProducts: [] },
//           publicRatingBreakdown: res.data.ratingBreakdown || null,
//         });
//       }

//       return res.data;
//     } catch (error) {
//       message.error(
//         error?.response?.data?.message || "Failed to load business profile"
//       );
//       throw error;
//     } finally {
//       set({ publicProfileLoading: false });
//     }
// },

  // ADMIN / MANAGEMENT UTILITIES
  
  fetchBusinesses: async (params = {}) => {
    set({ loading: true });
    try {
      const query = new URLSearchParams(params).toString();
      const res = await api.get(`/admin?${query}`);
      if (res.data.success) set({ businesses: res.data.businesses });
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
      if (res.data.success) set({ selectedBusiness: res.data.business });
      return res.data;
    } catch (error) {
      message.error("Failed to load business profile");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  reviewBusinessDocument: async (businessId, documentId, payload) => {
    try {
      const res = await api.patch(
        `/admin/${businessId}/documents/${documentId}/review`,
        payload,
      );

      if (res.data.success) {
        message.success(res.data.message);
        const current = get().selectedBusiness;

        if (current) {
          set({
            selectedBusiness: {
              ...current,
              verificationStatus: res.data.business?.verificationStatus || current.verificationStatus,
              verificationStage: res.data.business?.verificationStage || current.verificationStage,
              documents: res.data.business?.documents || current.documents,
              documentReviewSummary: res.data.business?.documentReviewSummary || current.documentReviewSummary,
              timeline: res.data.business?.timeline || current.timeline,
            },
          });
        }

        await get().fetchBusiness(businessId);
        await get().fetchBusinesses();
      }

      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Document review failed");
      throw error;
    }
  },

  verifyBusiness: async (id, payload) => {
    try {
      const res = await api.patch(`/admin/${id}/verify`, payload);

      if (res.data.success) {
        message.success(res.data.message);
        const current = get().selectedBusiness;

        if (current) {
          set({
            selectedBusiness: {
              ...current,
              verificationStatus: res.data.business?.verificationStatus || current.verificationStatus,
              verificationStage: res.data.business?.verificationStage || current.verificationStage,
              verifiedAt: res.data.business?.verifiedAt,
              rejectionReason: res.data.business?.rejectionReason,
              documents: res.data.business?.documents || current.documents,
              documentReviewSummary: res.data.business?.documentReviewSummary || current.documentReviewSummary,
              timeline: res.data.business?.timeline || current.timeline,
            },
          });
        }

        await get().fetchBusiness(id);
        await get().fetchBusinesses();
      }

      return res.data;
    } catch (error) {
      message.error(error?.response?.data?.message || "Verification failed");
      throw error;
    }
  },
}));