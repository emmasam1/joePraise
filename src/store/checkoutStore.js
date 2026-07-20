// import { create } from "zustand";

// export const useCheckoutStore = create((set) => ({
//   selectedItemIds: [],
//   scopeBusinessId: null, // null = mixed/global checkout, set = single-business checkout

//   setCheckoutSelection: (itemIds, businessId = null) =>
//     set({ selectedItemIds: itemIds, scopeBusinessId: businessId }),

//   clearCheckoutSelection: () => set({ selectedItemIds: [], scopeBusinessId: null }),
// }));

import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
  selectedItemIds: [],
  scopeBusinessId: null,

  setCheckoutSelection: (itemIds, businessId = null) =>
    set({ selectedItemIds: itemIds, scopeBusinessId: businessId }),

  clearCheckoutSelection: () => set({ selectedItemIds: [], scopeBusinessId: null }),
}));