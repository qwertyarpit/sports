"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser, useClerk, SignedIn, UserButton } from "@clerk/nextjs";
import { RootState } from "@/store";
import {
  setArticles,
  setLoading,
  setError,
  setFilters,
  applyFilters,
} from "@/store/newsSlice";
import { calculateTotalPayout, loadPayoutRates } from "@/store/payoutSlice";
import { fetchNews, exportToPDF, exportToCSV } from "@/utils/api";
import NewsList from "./NewsList";
import Filters from "./Filters";
import PayoutManager from "./PayoutManager";
import Stats from "./Stats";
import ThemeToggle from "./ThemeToggle";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { articles, filteredArticles, loading, error } = useSelector(
    (state: RootState) => state.news
  );
  const { totalPayout } = useSelector((state: RootState) => state.payouts);

  useEffect(() => {
    const loadNews = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchNews();
        dispatch(setArticles(data));

        // Calculate initial payout
        const newsCount = data.filter(
          (article) => article.type === "news"
        ).length;
        const blogCount = data.filter(
          (article) => article.type === "blog"
        ).length;
        dispatch(calculateTotalPayout({ news: newsCount, blog: blogCount }));

        // Load saved payout rates
        dispatch(loadPayoutRates());
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : "Failed to fetch news")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadNews();
  }, [dispatch]);

  const handleFilterChange = (filters: any) => {
    dispatch(setFilters(filters));
    dispatch(applyFilters());
  };

  const handleExport = async (format: "pdf" | "csv") => {
    try {
      if (format === "pdf") {
        await exportToPDF(filteredArticles);
      } else {
        exportToCSV(filteredArticles);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold dark:text-white">News Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-300">
            Welcome, {user?.firstName || user?.username}
          </span>
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold dark:text-white">
                News Articles
              </h2>
              <div className="space-x-2">
                <button
                  onClick={() => handleExport("pdf")}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Export PDF
                </button>
                <button
                  onClick={() => handleExport("csv")}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                  Export CSV
                </button>
              </div>
            </div>
            <NewsList
              articles={filteredArticles}
              loading={loading}
              error={error}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Stats articles={articles} totalPayout={totalPayout} />
          </div>

          {user?.publicMetadata?.role === "admin" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <PayoutManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
