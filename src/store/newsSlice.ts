import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsState, Article } from "@/types";

const initialState: NewsState = {
  articles: [],
  filteredArticles: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    type: "",
    dateRange: "",
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.filteredArticles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<NewsState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      let filtered = [...state.articles];

      if (state.filters.type) {
        filtered = filtered.filter(
          (article) => article.type === state.filters.type
        );
      }

      if (state.filters.dateRange) {
        const [start, end] = state.filters.dateRange.split("_to_");
        if (start && end) {
          filtered = filtered.filter((article) => {
            const articleDate = new Date(article.publishedAt);
            const startDate = new Date(start);
            const endDate = new Date(end);
            return articleDate >= startDate && articleDate <= endDate;
          });
        }
      }

      if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.content.toLowerCase().includes(query)
        );
      }

      state.filteredArticles = filtered;
    },
  },
});

export const { setArticles, setLoading, setError, setFilters, applyFilters } =
  newsSlice.actions;

export default newsSlice.reducer;
