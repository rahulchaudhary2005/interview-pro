import interviewReportModel from "../models/interviewReport.model.js";
import { InterviewAgent } from "../services/agent.service.js";
import {JDAgent} from "../ai/agents/jd.agent.js";
import { SkillGapAgent } from "../ai/agents/skillgap.agent.js";

const agent = new InterviewAgent();
const jdAgent = new JDAgent();
const skillGapAgent = new SkillGapAgent();

/**
 * @description Controller to run full interview preparation workflow
 */
async function runFullInterviewPrepController(req, res) {
  const { jobDescription, resume, selfDescription } = req.body;

  if (!jobDescription || (!resume && !selfDescription)) {
    return res.status(400).json({
      message: "Job description and either resume or self-description are required.",
    });
  }

  try {
    const result = await agent.runFullInterviewPrep(
      jobDescription,
      resume || selfDescription
    );

    if (!result.success) {
      return res.status(500).json({
        message: "Error running interview prep workflow",
        error: result.error,
      });
    }

    res.status(200).json({
      message: "Interview preparation workflow completed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error running interview prep",
      error: error.message,
    });
  }
}

/**
 * @description Controller to answer user queries using RAG
 */
async function answerQueryController(req, res) {
  const { query } = req.body;
  const userId = req.user.id;

  if (!query) {
    return res.status(400).json({
      message: "Query is required",
    });
  }

  try {
    // Fetch recent reports to build context
    const reports = await interviewReportModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3);

    const context = reports
      .map(
        (r) =>
          `Title: ${r.title}\nJob: ${r.jobDescription}\nSkills: ${r.skillGaps
            .map((s) => s.skill)
            .join(", ")}`
      )
      .join("\n\n");

    const answer = await agent.answerQuery(query, context || "No reports found");

    res.status(200).json({
      message: "Query answered successfully",
      query,
      answer,
      sources: reports.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error answering query",
      error: error.message,
    });
  }
}

async function analyzeSkillGapController(req, res) {

  try {

    const {
      resume,
      jobDescription,
    } = req.body;

    if (!resume || !jobDescription) {

      return res.status(400).json({
        message:
          "Resume and Job Description required",
      });
    }

    const analysis =
      await skillGapAgent.analyze(
        resume,
        jobDescription
      );

    res.status(200).json({
      message:
        "Skill gap analysis completed",
      analysis,
    });

  } catch (error) {

    console.log(
      "SKILL GAP CONTROLLER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Internal server error",
      error: error.message,
    });
  }
}

/**
 * @description Controller to analyze job description
 */
async function analyzeJobController(req, res) {
  const { jobDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({
      message: "Job description is required",
    });
  }

  try {
    const result = await jdAgent.analyze(jobDescription);

    // Handle both old and new response formats
    const analysis = result.data || result;

    res.status(200).json({
      message: "Job analysis completed successfully",
      analysis,
      source: result.source || "API",
      warning: result.warning || null,
      success: result.success !== false,
    });
  } catch (error) {
    console.error("Error analyzing job:", error);
    res.status(500).json({
      message: "Error analyzing job",
      error: error.message,
      success: false,
    });
  }
}

/**
 * @description Controller to generate interview questions
 */
async function generateQuestionsController(req, res) {
  const { jobTitle, skillLevel } = req.body;
  const userId = req.user.id;

  if (!jobTitle) {
    return res.status(400).json({
      message: "Job title is required",
    });
  }

  try {
    const jobAnalysis = await agent.analyzeJob(jobTitle);
    const questions = await agent.generateQuestions(jobAnalysis, {
      level: skillLevel || "mid-level",
    });

    res.status(200).json({
      message: "Questions generated successfully",
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating questions",
      error: error.message,
    });
  }
}

export {
  runFullInterviewPrepController,
  answerQueryController,
  analyzeJobController,
  generateQuestionsController,
  analyzeSkillGapController,
};
