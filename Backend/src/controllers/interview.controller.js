import pdfParse from "pdf-parse/lib/pdf-parse.js";

import interviewReportModel
  from "../models/interviewReport.model.js";

import {
  generateResumePdf,
} from "../services/ai.service.js";

import {
  interviewGraph,
} from "../ai/graph/interview.graph.js";



/**
 * =========================================================
 * GENERATE INTERVIEW REPORT
 * =========================================================
 */

async function generateInterViewReportController(
  req,
  res
) {

  try {

    /**
     * =========================================
     * VALIDATION
     * =========================================
     */

    const {
      selfDescription,
      jobDescription,
      role,
      level,
    } = req.body;



    if (!jobDescription) {

      return res.status(400).json({
        success: false,
        message:
          "Job description is required.",
      });
    }



    if (
      !req.file &&
      !selfDescription
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Resume or self description is required.",
      });
    }



    /**
     * =========================================
     * PARSE PDF RESUME
     * =========================================
     */

    let resumeText = "";

    if (req.file) {

      const resumeContent =
        await pdfParse(
          req.file.buffer
        );

      resumeText =
        resumeContent.text;
    }



    /**
     * =========================================
     * AI QUESTION GENERATION
     * =========================================
     */

    const graphResponse =
      await interviewGraph.invoke({

        resume:
          resumeText,

        jd:
          jobDescription,

        role:
          role ||
          "Software Engineer",

        level:
          level ||
          "Intermediate",
      });



    const aiData =
      graphResponse.output;



    /**
     * =========================================
     * NORMALIZE TECHNICAL QUESTIONS
     * =========================================
     */

    const technicalQuestions =
      (aiData.technicalQuestions || [])
        .map((question) => ({

          question,

          intention:
            "Evaluate technical knowledge",

          answer:
            "Expected AI-generated answer",
        }));



    /**
     * =========================================
     * NORMALIZE BEHAVIORAL QUESTIONS
     * =========================================
     */

    const behavioralQuestions =
      (aiData.behavioralQuestions || [])
        .map((question) => ({

          question,

          intention:
            "Evaluate communication and leadership",

          answer:
            "Expected behavioral answer",
        }));



    /**
     * =========================================
     * NORMALIZE DSA QUESTIONS
     * =========================================
     */

    const dsaQuestions =
      (aiData.dsaQuestions || [])
        .map((question) => ({

          question,

          difficulty:
            level || "Medium",

          answer:
            "Expected DSA solution",
        }));



    /**
     * =========================================
     * NORMALIZE SYSTEM DESIGN QUESTIONS
     * =========================================
     */

    const systemDesignQuestions =
      (aiData.systemDesignQuestions || [])
        .map((question) => ({

          question,

          intention:
            "Evaluate architecture skills",

          answer:
            "Expected system design answer",
        }));



    /**
     * =========================================
     * NORMALIZE FOLLOWUP QUESTIONS
     * =========================================
     */

    const followupQuestions =
      (aiData.followupQuestions || [])
        .map((question) => ({

          question,
        }));



    /**
     * =========================================
     * SAVE TO DATABASE
     * =========================================
     */

    const interviewReport =
      await interviewReportModel.create({

        /**
         * BASIC
         */

        title:
          role ||
          "Software Engineer",

        user:
          req.user?.id,

        resume:
          resumeText,

        selfDescription,

        jobDescription,



        /**
         * SCORES
         */

        matchScore: 85,

        atsScore: 80,

        faangReadiness: 75,

        interviewReadiness:
          "Advanced",



        /**
         * AI ANALYSIS
         */

        extractedSkills:
          aiData.focusAreas || [],

        missingSkills:
          aiData.weakAreas || [],

        strengths: [
          "Problem Solving",
          "System Design",
        ],

        weaknesses:
          aiData.weakAreas || [],

        recommendations:
          aiData.followupQuestions || [],

        suggestedProjects: [
          "AI Interview Platform",
          "RAG System",
        ],

        careerSuggestions: [
          "AI Engineer",
          "Full Stack Developer",
        ],



        /**
         * QUESTIONS
         */

        technicalQuestions,

        behavioralQuestions,

        dsaQuestions,

        systemDesignQuestions,

        followupQuestions,



        /**
         * OPTIONAL
         */

        skillGaps: [],

        preparationPlan: [],
      });



    /**
     * =========================================
     * RESPONSE
     * =========================================
     */

    return res.status(201).json({

      success: true,

      message:
        "Interview report generated successfully.",

      interviewReport,
    });

  } catch (error) {

    console.log(
      "Generate Interview Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to generate interview report.",

      error:
        error.message,
    });
  }
}



/**
 * =========================================================
 * GET INTERVIEW REPORT BY ID
 * =========================================================
 */

async function getInterviewReportByIdController(
  req,
  res
) {

  try {

    const {
      interviewId,
    } = req.params;



    const interviewReport =
      await interviewReportModel.findOne({

        _id:
          interviewId,

        user:
          req.user?.id,
      });



    if (!interviewReport) {

      return res.status(404).json({

        success: false,

        message:
          "Interview report not found.",
      });
    }



    return res.status(200).json({

      success: true,

      message:
        "Interview report fetched successfully.",

      interviewReport,
    });

  } catch (error) {

    console.log(
      "Get Interview Report Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch interview report.",

      error:
        error.message,
    });
  }
}



/**
 * =========================================================
 * GET ALL REPORTS
 * =========================================================
 */

async function getAllInterviewReportsController(
  req,
  res
) {

  try {

    const interviewReports =
      await interviewReportModel
        .find({
          user:
            req.user?.id,
        })
        .sort({
          createdAt: -1,
        });



    return res.status(200).json({

      success: true,

      message:
        "Interview reports fetched successfully.",

      interviewReports,
    });

  } catch (error) {

    console.log(
      "Get All Reports Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch interview reports.",

      error:
        error.message,
    });
  }
}



/**
 * =========================================================
 * GENERATE RESUME PDF
 * =========================================================
 */

async function generateResumePdfController(
  req,
  res
) {

  try {

    const {
      interviewReportId,
    } = req.params;



    const interviewReport =
      await interviewReportModel.findById(
        interviewReportId
      );



    if (!interviewReport) {

      return res.status(404).json({

        success: false,

        message:
          "Interview report not found.",
      });
    }



    const {
      resume,
      jobDescription,
      selfDescription,
    } = interviewReport;



    const pdfBuffer =
      await generateResumePdf({

        resume,

        jobDescription,

        selfDescription,
      });



    res.set({

      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        `attachment; filename=resume_${interviewReportId}.pdf`,
    });



    return res.send(
      pdfBuffer
    );

  } catch (error) {

    console.log(
      "Generate PDF Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to generate resume PDF.",

      error:
        error.message,
    });
  }
}



export {

  generateInterViewReportController,

  getInterviewReportByIdController,

  getAllInterviewReportsController,

  generateResumePdfController,
};