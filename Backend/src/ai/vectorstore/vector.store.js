import { chromaClient }
from "./chroma.client.js";

let collection = null;

export const getVectorStore =
  async () => {

    if (!collection) {

      collection =
        await chromaClient
          .getOrCreateCollection({

            name:
              "interview-ai-vectors",

            metadata: {
              "hnsw:space":
                "cosine",
            },
          });
    }

    return collection;
  };

export const vectorStore = {

  async add({
    documents,
    embeddings,
    ids,
    metadatas = [],
  }) {

    const store =
      await getVectorStore();

    await store.add({
      documents,
      embeddings,
      ids,
      metadatas,
    });
  },

  async query({
    queryEmbeddings,
    nResults = 5,
  }) {

    const store =
      await getVectorStore();

    return await store.query({
      queryEmbeddings,
      nResults,
    });
  },
};