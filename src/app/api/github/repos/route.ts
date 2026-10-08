import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubRepos } from "@/lib/github";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "bhandehemant2004-debug";

  try {
    const repos = await fetchGitHubRepos(username);
    return NextResponse.json(repos);
  } catch (error) {
    console.error("API error fetching repos:", error);
    return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}
