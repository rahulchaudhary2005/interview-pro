import { getVectorStore } from './vector.store.js';

export const initializeVectorIndex = async () => {
  const vectorStore = await getVectorStore();

  console.log('Vector Store Ready');

  return vectorStore;
};
