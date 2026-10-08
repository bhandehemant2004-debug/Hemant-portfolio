import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/github";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "bhandehemant2004-debug";

  try {
    const data = await fetchGitHubContributions(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error fetching contributions:", error);
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
  }
}
