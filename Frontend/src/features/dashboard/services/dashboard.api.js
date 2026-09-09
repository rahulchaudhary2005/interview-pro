import apiClient from "../../../lib/api.client";

export const getDashboardStatsAPI = async () => {
  const response = await apiClient.get("/dashboard/stats");

  return response.data.data;
};
