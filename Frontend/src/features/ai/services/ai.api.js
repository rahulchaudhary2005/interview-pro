import apiClient from "../../../lib/api.client";

export const generateInterviewReportAPI = async (formData) => {
  const response = await apiClient.post("/interview", formData);

  return response.data;
};

export const fetchInterviewReportsAPI = async () => {
  const response = await apiClient.get("/interview");

  return response.data;
};

export const fetchInterviewReportByIdAPI = async (id) => {
  const response = await apiClient.get(`/interview/report/${id}`);

  return response.data;
};

export const generateResumePdfAPI = async (interviewReportId) => {
  const response = await apiClient.post(
    `/interview/resume/pdf/${interviewReportId}`,
    null,
    { responseType: "blob" }
  );

  return response.data;
};
