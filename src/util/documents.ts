import type { Document } from "langchain/document";
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";

type Metadata = Record<string, unknown>;

function addMetadata(doc: Document, metadata: Metadata) {
  return {
    ...doc,
    metadata: {
      ...doc.metadata,
      ...metadata,
    },
  } as Document;
}

export async function loadDocuments(buffer: Buffer, fileName: string, metadata: Metadata = {}) {
  const loader = new UnstructuredLoader(
    { buffer, fileName },
    {
      apiKey: process.env.UNSTRUCTURED_API_KEY,
      apiUrl: process.env.UNSTRUCTURED_API_URL,
    }
  );

  const documents = await loader.load();
  return documents.map((doc) => addMetadata(doc, metadata));
}
