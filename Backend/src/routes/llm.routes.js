import express from "express";
import {
  runFullInterviewPrepController,
  answerQueryController,
  analyzeJobController,
  generateQuestionsController,
  analyzeSkillGapController
} from "../controllers/llm.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const llmRouter = express.Router();

/**
 * @route POST /api/llm/interview-prep
 * @description Run full interview preparation workflow
 * @access private
 */
llmRouter.post(
  "/interview-prep",
  authUser,
  runFullInterviewPrepController
);
llmRouter.post(
  "/skill-gap",
  authUser,
  analyzeSkillGapController
);

/**
 * @route POST /api/llm/query
 * @description Answer user queries using RAG
 * @access private
 */
llmRouter.post("/query", authUser, answerQueryController);

/**
 * @route POST /api/llm/analyze-job
 * @description Analyze job description
 * @access private
 */
llmRouter.post("/analyze-job", authUser, analyzeJobController);

/**
 * @route POST /api/llm/generate-questions
 * @description Generate interview questions
 * @access private
 */
llmRouter.post(
  "/generate-questions",
  authUser,
  generateQuestionsController
);

export default llmRouter;
