export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
  type: "news" | "blog";
  author: string;
  content: string;
}

export interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    type: string;
    dateRange: string;
  };
}

export interface PayoutState {
  rates: {
    news: number;
    blog: number;
  };
  totalPayout: number;
}

export interface PayoutRates {
  news: number;
  blog: number;
}
