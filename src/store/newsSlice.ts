import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsState, Article } from "@/types";

export interface Article {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  type: "news" | "blog";
  content: string;
  url: string;
}

interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  loading: boolean;
  error: string | null;
  filters: {
    author: string;
    dateRange: {
      start: string;
      end: string;
    };
    type: string;
    searchQuery: string;
  };
}

const initialState: NewsState = {
  articles: [],
  filteredArticles: [],
  loading: false,
  error: null,
  filters: {
    author: "",
    dateRange: {
      start: "",
      end: "",
    },
    type: "",
    searchQuery: "",
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

      if (state.filters.author) {
        filtered = filtered.filter((article) =>
          article.author
            .toLowerCase()
            .includes(state.filters.author.toLowerCase())
        );
      }

      if (state.filters.type) {
        filtered = filtered.filter(
          (article) => article.type === state.filters.type
        );
      }

      if (state.filters.dateRange.start && state.filters.dateRange.end) {
        filtered = filtered.filter((article) => {
          const articleDate = new Date(article.publishedAt);
          const startDate = new Date(state.filters.dateRange.start);
          const endDate = new Date(state.filters.dateRange.end);
          return articleDate >= startDate && articleDate <= endDate;
        });
      }

      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
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
