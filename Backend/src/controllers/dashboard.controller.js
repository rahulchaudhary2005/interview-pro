// backend/src/controllers/dashboard.controller.js

import { getDashboardStats } from "../services/stats.service.js";

export const fetchDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const stats = await getDashboardStats(userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};