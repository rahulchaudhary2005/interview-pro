import apiClient from "../../../lib/api.client";

export const parseResumeAPI = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await apiClient.post("/resume/parse", formData);

  return response.data;
};
