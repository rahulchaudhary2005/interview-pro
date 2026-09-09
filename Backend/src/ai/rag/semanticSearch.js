import { retrieveContext } from './retriever.js';

export const semanticSearch = async (query) => {
  const documents = await retrieveContext(query);

  return {
    query,
    results: documents,
  };
};