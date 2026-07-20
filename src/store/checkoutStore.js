
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      selectedItemIds: [],
      scopeBusinessId: null,

      setCheckoutSelection: (itemIds, businessId = null) =>
        set({ selectedItemIds: itemIds, scopeBusinessId: businessId }),

      clearCheckoutSelection: () => set({ selectedItemIds: [], scopeBusinessId: null }),
    }),
    {
      name: "joepraise-checkout-selection",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);