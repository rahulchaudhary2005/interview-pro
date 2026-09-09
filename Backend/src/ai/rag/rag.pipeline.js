import crypto from "crypto";

import {
  textChunker
} from "../chunking/textChunker.js";

import {
  embeddings
} from "../embeddings/embedding.service.js";

import {
  vectorStore
} from "../vectorstore/vector.store.js";

export const ragPipeline =
  async (
    text,
    source = "resume"
  ) => {

    const chunks =
      await textChunker(text);

    for (const chunk of chunks) {

      const embedding =
        await embeddings.embedQuery(
          chunk.pageContent
        );

      await vectorStore.add({

        documents: [
          chunk.pageContent
        ],

        embeddings: [
          embedding
        ],

        ids: [
          crypto.randomUUID()
        ],

        metadatas: [
          {
            source,
          }
        ],
      });
    }

    return {
      success: true,
      chunksStored:
        chunks.length,
    };
  };