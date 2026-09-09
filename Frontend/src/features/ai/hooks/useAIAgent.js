import { useState } from "react";
import { runAgentQuery } from "../agent/aiAgent";

export const useAIAgent = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const executeQuery = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await runAgentQuery(query);
      setResult(response);
      return response;
    } catch (err) {
      setError(err?.message || "Unable to run AI agent query.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, executeQuery };
};
