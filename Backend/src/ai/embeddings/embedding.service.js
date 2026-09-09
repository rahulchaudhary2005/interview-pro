import { generateEmbedding } from "./huggingface.embedding.js";

export const embeddings = {

  embedQuery: async (
    text
  ) => {

    return await generateEmbedding(
      text
    );
  },

  embedDocuments: async (
    documents
  ) => {

    const results = [];

    for (const doc of documents) {

      const embedding =
        await generateEmbedding(doc);

      results.push(embedding);
    }

    return results;
  },
};