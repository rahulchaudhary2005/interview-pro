import {
  RecursiveCharacterTextSplitter
} from "langchain/text_splitter";

export const textChunker =
  async (text) => {

    const splitter =
      new RecursiveCharacterTextSplitter({

        chunkSize: 700,

        chunkOverlap: 120,

        separators: [
          "\n\n",
          "\n",
          ". ",
          " ",
        ],
      });

    return await splitter.createDocuments([
      text,
    ]);
  };