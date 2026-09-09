import apiClient from "../../../lib/api.client";

export const runInterviewPrepAPI = async (data) => {
  const response = await apiClient.post("/llm/interview-prep", data);

  return response.data;
};

export const answerQueryAPI = async (query) => {
  const response = await apiClient.post("/llm/query", { query });

  return response.data;
};

export const analyzeJobAPI = async (jobDescription) => {
  const response = await apiClient.post("/llm/analyze-job", {
    jobDescription,
  });

  return response.data;
};

export const analyzeSkillGapAPI = async (resume, jobDescription) => {
  const response = await apiClient.post("/llm/skill-gap", {
    resume,
    jobDescription,
  });

  return response.data;
};

export const generateQuestionsAPI = async (jobTitle, skillLevel) => {
  const response = await apiClient.post("/llm/generate-questions", {
    jobTitle,
    skillLevel,
  });

  return response.data;
};
