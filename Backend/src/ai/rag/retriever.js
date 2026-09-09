import {
  embeddings
} from "../embeddings/embedding.service.js";

import {
  vectorStore
} from "../vectorstore/vector.store.js";

export const retrieveContext =
  async (
    query
  ) => {

    const queryEmbedding =
      await embeddings.embedQuery(
        query
      );

    const result =
      await vectorStore.query({

        queryEmbeddings: [
          queryEmbedding
        ],

        nResults: 5,
      });

    const docs =
      result.documents?.[0] || [];

    return docs.join("\n");
  };