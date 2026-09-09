import { useState } from "react";
import { answerQueryAPI, analyzeJobAPI, generateQuestionsAPI, analyzeSkillGapAPI } from "../services/llm.api";

export const useLLMQuery = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const queryLLM = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await answerQueryAPI(query);
      setResult(response);
      return response;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.message || "Query failed";
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeJob = async (jobDescription) => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeJobAPI(jobDescription);
      setResult(response);
      return response;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.message || "Analysis failed";
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = async (jobTitle, skillLevel) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateQuestionsAPI(jobTitle, skillLevel);
      setResult(response);
      return response;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.message || "Generation failed";
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const analyzeSkillGap = async (
  resume,
  jobDescription
) => {

  setLoading(true);

  setError(null);

  try {

    const response =
      await analyzeSkillGapAPI(
        resume,
        jobDescription
      );

    setResult(response);

    return response;

  } catch (err) {

    const errorMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Skill gap analysis failed";

    setError(errorMsg);

    return null;

  } finally {

    setLoading(false);
  }
};

  return { loading, result, error, queryLLM, analyzeJob, generateQuestions, analyzeSkillGap };
};
