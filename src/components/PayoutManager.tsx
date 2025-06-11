"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setPayoutRate } from "@/store/payoutSlice";

export default function PayoutManager() {
  const dispatch = useDispatch();
  const { rates } = useSelector((state: RootState) => state.payouts);
  const [editingRate, setEditingRate] = useState<{
    type: string;
    rate: number;
  } | null>(null);

  const handleRateChange = (type: string, rate: number) => {
    dispatch(setPayoutRate({ type: type as "news" | "blog", rate }));
  };

  const newsRate = rates.news;
  const blogRate = rates.blog;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Payout Rates</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="newsRate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            News Articles Rate ($)
          </label>
          <input
            type="number"
            id="newsRate"
            value={newsRate}
            onChange={(e) =>
              handleRateChange("news", parseFloat(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="blogRate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Blog Posts Rate ($)
          </label>
          <input
            type="number"
            id="blogRate"
            value={blogRate}
            onChange={(e) =>
              handleRateChange("blog", parseFloat(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}
