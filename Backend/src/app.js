import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import llmRouter from "./routes/llm.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import resumeRouter from "./routes/resume.routes.js";

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRouter);

app.use("/api/interview", interviewRouter);

app.use("/api/llm", llmRouter);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/resume", resumeRouter);

/* =========================
   HEALTH CHECK ROUTE
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Backend Running",
  });
});

/* =========================
   404 HANDLER
========================= */

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
