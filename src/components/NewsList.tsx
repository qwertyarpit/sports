"use client";

import { Article } from "@/types";
import { format } from "date-fns";
import Image from "next/image";

interface NewsListProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

// List of allowed image domains
const ALLOWED_IMAGE_DOMAINS = [
  "img.etimg.com",
  "media.news.climate.columbia.edu",
  "newsapi.org",
  "nytimes.com",
  "reuters.com",
  "bloomberg.com",
  "wsj.com",
  "cnbc.com",
  "bbc.com",
  "guardian.co.uk",
];

// Function to check if image URL is from allowed domain
const isAllowedImageDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return ALLOWED_IMAGE_DOMAINS.some((allowed) => domain.includes(allowed));
  } catch {
    return false;
  }
};

export default function NewsList({ articles, loading, error }: NewsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-gray-500 text-center p-4 dark:text-gray-400">
        No articles found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {article.urlToImage && isAllowedImageDomain(article.urlToImage) && (
            <div className="relative h-48">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              {article.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {article.description}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{article.author}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
