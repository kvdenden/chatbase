import { NextRequest, NextResponse } from "next/server";

import { loadDocuments } from "@/util/documents";
import { storeDocuments } from "@/util/store";

async function loadFromFile(file: File) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;

  return loadDocuments(fileBuffer, fileName);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    const documents = await loadFromFile(file);
    await storeDocuments(documents);

    return NextResponse.json({ documents }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
