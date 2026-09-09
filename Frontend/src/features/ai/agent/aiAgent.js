import { buildRAGResponse } from "../services/rag.service";

export const runAgentQuery = async (query) => {
  if (!query || !query.trim()) {
    return {
      query,
      response: "Please enter a question to start the AI agent.",
      hits: [],
    };
  }

  const ragResponse = await buildRAGResponse(query);

  return {
    query,
    answer: ragResponse.response,
    sources: ragResponse.hits,
  };
};
