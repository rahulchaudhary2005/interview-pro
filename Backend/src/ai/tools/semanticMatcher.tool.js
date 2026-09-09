import {
  pipeline,
} from "@xenova/transformers";

/* =========================================
   MODEL
========================================= */

let extractor;

/* =========================================
   LOAD MODEL
========================================= */

const loadModel =
  async () => {

    if (!extractor) {

      extractor =
        await pipeline(

          "feature-extraction",

          "Xenova/all-MiniLM-L6-v2"
        );
    }

    return extractor;
  };

/* =========================================
   COSINE SIMILARITY
========================================= */

const cosineSimilarity = (
  vecA,
  vecB
) => {

  let dot = 0;

  let normA = 0;

  let normB = 0;

  for (
    let i = 0;
    i < vecA.length;
    i++
  ) {

    dot +=
      vecA[i] * vecB[i];

    normA +=
      vecA[i] * vecA[i];

    normB +=
      vecB[i] * vecB[i];
  }

  return (
    dot /
    (
      Math.sqrt(normA) *
      Math.sqrt(normB)
    )
  );
};

/* =========================================
   GET EMBEDDING
========================================= */

const getEmbedding =
  async (text) => {

    const model =
      await loadModel();

    const output =
      await model(text, {

        pooling: "mean",

        normalize: true,
      });

    return Array.from(
      output.data
    );
  };

/* =========================================
   CHUNK RESUME
========================================= */

const chunkText = (
  text,
  chunkSize = 300
) => {

  const words =
    text.split(" ");

  const chunks = [];

  for (
    let i = 0;
    i < words.length;
    i += chunkSize
  ) {

    chunks.push(

      words
        .slice(
          i,
          i + chunkSize
        )
        .join(" ")
    );
  }

  return chunks;
};

/* =========================================
   SEMANTIC MATCHER
========================================= */

export const semanticSkillMatch =
  async (
    skill,
    resumeText
  ) => {

    try {

      const skillEmbedding =
        await getEmbedding(
          skill
        );

      const chunks =
        chunkText(
          resumeText
        );

      let bestSimilarity = 0;

      for (
        const chunk of chunks
      ) {

        const chunkEmbedding =
          await getEmbedding(
            chunk
          );

        const similarity =
          cosineSimilarity(

            skillEmbedding,

            chunkEmbedding
          );

        if (
          similarity >
          bestSimilarity
        ) {

          bestSimilarity =
            similarity;
        }
      }

      return bestSimilarity;

    } catch (error) {

      console.log(
        "SEMANTIC MATCH ERROR:",
        error.message
      );

      return 0;
    }
  };