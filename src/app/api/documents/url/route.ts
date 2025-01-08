import { NextRequest, NextResponse } from "next/server";
import mime from "mime-types";

import { loadDocuments } from "@/util/documents";
import { storeDocuments } from "@/util/store";

function toFileName(url: URL, contentType: string | null) {
  const fileName = url.pathname.split("/").pop() || "index";
  const extension = (contentType && mime.extension(contentType)) || "html";

  return `${fileName}.${extension}`;
}

async function loadFromURL(url: URL) {
  const response = await fetch(url);

  const htmlBuffer = Buffer.from(await response.arrayBuffer());
  const fileName = toFileName(url, response.headers.get("content-type"));

  return loadDocuments(htmlBuffer, fileName, { source: url.toString() });
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    const documents = await loadFromURL(new URL(url));
    await storeDocuments(documents);

    return NextResponse.json({ documents }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
