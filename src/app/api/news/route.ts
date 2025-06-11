import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      console.error("NEWS_API_KEY is not defined in environment variables");
      return NextResponse.json(
        { error: "News API key is not configured" },
        { status: 500 }
      );
    }

    console.log("Fetching news from News API...");
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=technology&language=en&sortBy=publishedAt&apiKey=${apiKey}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("News API error:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(
        `News API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Successfully fetched news data");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in news API route:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch news",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
