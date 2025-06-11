import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PayoutState, PayoutRates } from "@/types";

export interface PayoutRate {
  type: "news" | "blog";
  rate: number;
}

interface PayoutState {
  rates: PayoutRate[];
  totalPayout: number;
}

const initialState: PayoutState = {
  rates: [
    { type: "news", rate: 50 },
    { type: "blog", rate: 75 },
  ],
  totalPayout: 0,
};

const payoutSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {
    setPayoutRate: (state, action: PayloadAction<PayoutRate>) => {
      const index = state.rates.findIndex(
        (rate) => rate.type === action.payload.type
      );
      if (index !== -1) {
        state.rates[index] = action.payload;
      } else {
        state.rates.push(action.payload);
      }
      // Save to localStorage
      localStorage.setItem("payoutRates", JSON.stringify(state.rates));
    },
    calculateTotalPayout: (
      state,
      action: PayloadAction<{ news: number; blog: number }>
    ) => {
      const newsRate =
        state.rates.find((rate) => rate.type === "news")?.rate || 0;
      const blogRate =
        state.rates.find((rate) => rate.type === "blog")?.rate || 0;

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
