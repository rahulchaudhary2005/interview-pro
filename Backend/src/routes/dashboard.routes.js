// backend/src/routes/dashboard.routes.js

import express from "express";
import { fetchDashboardStats } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats", protect, fetchDashboardStats);

export default router;