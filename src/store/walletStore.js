import { create } from "zustand";
import api from "@/api/axios";

export const useWalletStore = create((set, get) => ({
  // ---- balance card ----
  balance: null, // { availableBalance, reservedBalance, pendingBalance, incentiveBalance, totalEarnings, currency, isActive, updatedAt }
  balanceLoading: false,
  balanceError: null,

  // ---- earnings summary (daily/weekly/monthly + withdrawn + lifetime) ----
  earnings: null,
  earningsLoading: false,
  earningsError: null,

  // ---- transaction history ----
  transactions: [],
  pagination: null,
  transactionsLoading: false,
  transactionsError: null,

  // ---- payout request ----
  payoutLoading: false,
  payoutError: null,

  getBalance: async () => {
    try {
      set({ balanceLoading: true, balanceError: null });
      const { data } = await api.get("/wallet/me");

      if (data.success) {
        set({ balance: data.data, balanceLoading: false });
      }
    } catch (error) {
      set({
        balanceLoading: false,
        balanceError:
          error?.response?.data?.message || error.message || "Failed to load wallet balance",
      });
    }
  },

  getEarningsSummary: async () => {
    try {
      set({ earningsLoading: true, earningsError: null });
      const { data } = await api.get("/wallet/earnings-summary");

      if (data.success) {
        set({ earnings: data.data, earningsLoading: false });
      }
    } catch (error) {
      set({
        earningsLoading: false,
        earningsError:
          error?.response?.data?.message || error.message || "Failed to load earnings summary",
      });
    }
  },

  getTransactions: async (params = {}) => {
    try {
      set({ transactionsLoading: true, transactionsError: null });
      const { data } = await api.get("/wallet/transactions", { params });

      if (data.success) {
        set({
          transactions: data.transactions,
          pagination: data.pagination,
          transactionsLoading: false,
        });
      }
    } catch (error) {
      set({
        transactionsLoading: false,
        transactionsError:
          error?.response?.data?.message || error.message || "Failed to load transactions",
      });
    }
  },

  requestPayout: async (amount) => {
    try {
      set({ payoutLoading: true, payoutError: null });
      const { data } = await api.post("/wallet/payout", { amount });

      set({ payoutLoading: false });

      // refresh balance + earnings + transactions so the UI reflects the new state
      await Promise.all([
        get().getBalance(),
        get().getEarningsSummary(),
        get().getTransactions(),
      ]);

      return { success: true, message: data.message, data: data.data };
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || "Failed to submit payout request";
      set({ payoutLoading: false, payoutError: msg });
      return { success: false, message: msg };
    }
  },
}));
