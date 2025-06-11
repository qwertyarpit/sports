"use client";

import { Article } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface StatsProps {
  articles: Article[];
  totalPayout: number;
}

export default function Stats({ articles, totalPayout }: StatsProps) {
  const totalArticles = articles.length;
  const newsCount = articles.filter(
    (article) => article.type === "news"
  ).length;
  const blogCount = articles.filter(
    (article) => article.type === "blog"
  ).length;

  // Prepare data for author distribution chart
  const authorData = articles.reduce((acc: any[], article) => {
    const existingAuthor = acc.find((item) => item.author === article.author);
    if (existingAuthor) {
      existingAuthor.articles++;
    } else {
      acc.push({ author: article.author, articles: 1 });
    }
    return acc;
  }, []);

  // Prepare data for type distribution pie chart
  const typeData = [
    { name: "News", value: newsCount },
    { name: "Blog", value: blogCount },
  ];

  const COLORS = ["#3B82F6", "#10B981"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Statistics</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Content Distribution
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300">News Articles</p>
              <p className="text-2xl font-bold dark:text-white">{newsCount}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Blog Posts</p>
              <p className="text-2xl font-bold dark:text-white">{blogCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Total Payout
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ${totalPayout.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Top Authors</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={authorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="author" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="articles" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
