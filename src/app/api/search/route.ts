import { NextRequest, NextResponse } from "next/server";
import { searchDocuments } from "@/util/store";

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  const results = await searchDocuments(query);

  return NextResponse.json({ results });
}
