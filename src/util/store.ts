import type { Document } from "langchain/document";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { OpenAIEmbeddings } from "@langchain/openai";

import { pool } from "./db";
import type { Metadata } from "./documents";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

const vectorStore = await PGVectorStore.initialize(embeddings, {
  pool,
  tableName: "documents",
});

export async function storeDocuments(documents: Document[]) {
  return vectorStore.addDocuments(documents);
}

export async function searchDocuments(query: string, { limit, filter }: { limit?: number; filter?: Metadata } = {}) {
  return vectorStore.similaritySearch(query, limit, filter);
}

export default vectorStore;
