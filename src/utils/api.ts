import axios from "axios";
import { Article } from "@/types";
import jsPDF from "jspdf";
import "jspdf-autotable";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

export const fetchNews = async (): Promise<Article[]> => {
  try {
    const response = await axios.get("/api/news");

    if (!response.data.articles || !Array.isArray(response.data.articles)) {
      throw new Error("Invalid response format from news API");
    }

    return response.data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      author: article.author || "Unknown",
      publishedAt: article.publishedAt,
      type: "news",
      content: article.description,
      url: article.url,
      source: article.source?.name || "Unknown",
      urlToImage: article.urlToImage,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const exportToPDF = async (data: Article[]) => {
  const doc = new jsPDF();

  doc.text("News Articles Report", 20, 20);

  let y = 40;
  data.forEach((article, index) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(`${index + 1}. ${article.title}`, 20, y);
    doc.text(`Author: ${article.author}`, 20, y + 10);
    doc.text(
      `Date: ${new Date(article.publishedAt).toLocaleDateString()}`,
      20,
      y + 20
    );
    y += 40;
  });

  doc.save("news-report.pdf");
};

export const exportToCSV = (data: Article[]) => {
  const headers = ["Title", "Author", "Published Date", "Type", "URL"];
  const csvData = data.map((article) => [
    article.title,
    article.author,
    new Date(article.publishedAt).toLocaleDateString(),
    article.type,
    article.url,
  ]);

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "news-report.csv";
  link.click();
};
