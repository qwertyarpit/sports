import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayoutState, PayoutRates } from "@/types";

export interface PayoutRate {
  type: "news" | "blog";
  rate: number;
}

const initialState: PayoutState = {
  rates: {
    news: 50,
    blog: 75,
  },
  totalPayout: 0,
};

const payoutSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {
    setPayoutRate: (state, action: PayloadAction<PayoutRate>) => {
      state.rates[action.payload.type] = action.payload.rate;
      // Save to localStorage
      localStorage.setItem("payoutRates", JSON.stringify(state.rates));
    },
    calculateTotalPayout: (
      state,
      action: PayloadAction<{ news: number; blog: number }>
    ) => {
      const newsRate = state.rates.news || 0;
      const blogRate = state.rates.blog || 0;
      state.totalPayout =
        action.payload.news * newsRate + action.payload.blog * blogRate;
    },
    loadPayoutRates: (state) => {
      const savedRates = localStorage.getItem("payoutRates");
      if (savedRates) {
        state.rates = JSON.parse(savedRates);
      }
    },
  },
});

export const { setPayoutRate, calculateTotalPayout, loadPayoutRates } =
  payoutSlice.actions;

export default payoutSlice.reducer;
