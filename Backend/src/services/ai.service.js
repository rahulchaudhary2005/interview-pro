import { GoogleGenAI } from "@google/genai";
import puppeteer from "puppeteer";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { geminiApiKey, geminiModel } from "../config/env.js";

import { extractSkillsFromResume } from "../ai/parser/resumeParser.js";
import { calculateATSScore } from "../ai/tools/atsScorer.js";
import { detectMissingSkills } from "../ai/tools/skillGapAnalyzer.js";
import { calculateFAANGReadiness } from "../ai/tools/faangAnalyzer.js";

const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate profile matches the job description"
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical interview question"),

        intention: z
          .string()
          .describe("Why interviewer asks this question"),

        answer: z
          .string()
          .describe("How candidate should answer"),
      })
    )
    .describe("Technical interview questions"),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioral interview question"),

        intention: z
          .string()
          .describe("Purpose behind the question"),

        answer: z
          .string()
          .describe("Suggested answer strategy"),
      })
    )
    .describe("Behavioral interview questions"),

  skillGaps: z
    .array(
      z.object({
        skill: z.string(),

        severity: z.enum([
          "low",
          "medium",
          "high",
        ]),
      })
    )
    .describe("Missing skills"),
    
  

    preparationPlan: z
  .array(
    z.object({
      day: z.number(),

      focus: z.string(),

      tasks: z.array(z.string()),
    })
  )
  .describe("Preparation roadmap"),

title: z
  .string()
  .describe("Target job title"),

atsScore: z
  .number()
  .describe(
    "ATS optimization score between 0 and 100"
  ),

faangReadiness: z
  .number()
  .describe(
    "FAANG readiness score between 0 and 100"
  ),

interviewReadiness: z
  .string()
  .describe(
    "Overall interview readiness level"
  ),

extractedSkills: z
  .array(z.string())
  .describe(
    "Skills extracted from resume"
  ),

missingSkills: z
  .array(z.string())
  .describe(
    "Important missing skills"
  ),

strengths: z
  .array(z.string())
  .describe(
    "Candidate strengths"
  ),

weaknesses: z
  .array(z.string())
  .describe(
    "Candidate weaknesses"
  ),

recommendations: z
  .array(z.string())
  .describe(
    "Recommendations to improve profile"
  ),

suggestedProjects: z
  .array(z.string())
  .describe(
    "Suggested projects for growth"
  ),

careerSuggestions: z
  .array(z.string())
  .describe(
    "Recommended career paths"
  ),
//   preparationPlan: z
//     .array(
//       z.object({
//         day: z.number(),

//         focus: z.string(),

//         tasks: z.array(z.string()),
//       })
//     )
//     .describe("Preparation roadmap"),
     

// title: z
//   .string()
//   .describe("Target job title"),

// atsScore: z
//   .number()
//   .describe(
//     "ATS optimization score between 0 and 100"
//   ),

// faangReadiness: z
//   .number()
//   .describe(
//     "FAANG readiness score between 0 and 100"
//   ),

// interviewReadiness: z
//   .string()
//   .describe(
//     "Overall interview readiness level"
//   ),

// extractedSkills: z
//   .array(z.string())
//   .describe(
//     "Skills extracted from resume"
//   ),

// missingSkills: z
//   .array(z.string())
//   .describe(
//     "Important missing skills"
//   ),

// strengths: z
//   .array(z.string())
//   .describe(
//     "Candidate strengths"
//   ),

// weaknesses: z
//   .array(z.string())
//   .describe(
//     "Candidate weaknesses"
//   ),

// recommendations: z
//   .array(z.string())
//   .describe(
//     "Recommendations to improve profile"
//   ),

// suggestedProjects: z
//   .array(z.string())
//   .describe(
//     "Suggested projects for growth"
//   ),

// careerSuggestions: z
//   .array(z.string())
//   .describe(
//     "Recommended career paths"
//   ),
});



/* =========================================================
   GENERATE INTERVIEW REPORT
========================================================= */

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {

  const prompt = `
You are a senior FAANG hiring manager, ATS optimization expert, staff-level software engineer interviewer, and AI career coach.

Your job is to deeply analyze resumes like a real recruiter and provide highly intelligent, realistic, industry-level feedback.

You must think like:
- Google recruiter
- Meta engineering manager
- Amazon bar raiser
- Microsoft hiring panel
- AI startup CTO

Provide highly actionable and personalized analysis.

Analyze the candidate deeply.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

Generate:

- interview preparation analysis
- skill gaps
- technical questions
- behavioral questions
- preparation roadmap

Also provide:

1. ATS score
2. FAANG readiness score
3. Extracted skills
4. Missing skills
5. Strengths
6. Weaknesses
7. Resume recommendations
8. Suggested AI/full-stack projects
9. Career suggestions
10. Interview readiness level

Make the analysis:
- detailed
- professional
- ATS optimized
- FAANG-level
- realistic
- actionable
- personalized according to resume and job description.
- Do NOT generate generic answers
- Use real-world engineering standards
- Analyze resume like a real ATS system
- Prioritize skills matching job description
- Give production-level project ideas
- Recommend missing technologies
- Focus on employability improvement
- Give realistic FAANG-level guidance
`;

  const response =
    await ai.models.generateContent({
        
      model: geminiModel,

      contents: prompt,

      config: {
        responseMimeType:
          "application/json",

        responseSchema:
          zodToJsonSchema(
            interviewReportSchema
          ),

          temperature: 0.4,
         topP: 0.95,
         topK: 40,
      },
    });

  /* =========================
     PARSE AI RESPONSE
  ========================= */

 let parsedResult = {};
 let rawText = "";

try {

  rawText =
  typeof response.text === "function"
    ? response.text()
    : response.text;

console.log(
  "RAW GEMINI RESPONSE:",
  rawText
);

parsedResult =
  JSON.parse(rawText);

} catch (error) {

  console.log(
    "Gemini JSON Parse Error:",
    error
  );

  console.log(
    "Raw Gemini Response:",
    rawText
  );

parsedResult = {

  matchScore: 0,

  technicalQuestions: [],

  behavioralQuestions: [],

  skillGaps: [],

  preparationPlan: [],

  title: "AI Generated Report",

  atsScore: 0,

  faangReadiness: 0,

  interviewReadiness:
    "Needs Improvement",

  extractedSkills: [],

  missingSkills: [],

  strengths: [
    "Unable to fully analyze profile",
  ],

  weaknesses: [
    "AI parsing failed",
  ],

  recommendations: [
    "Try uploading another resume",
  ],

  suggestedProjects: [
    "AI Resume Analyzer",
  ],

  careerSuggestions: [
    "Software Engineer",
  ],
};
}

  /* =========================
     EXTRACT SKILLS
  ========================= */

  const extractedSkills =
    extractSkillsFromResume(
      resume || ""
    );

  /* =========================
     ATS SCORE
  ========================= */

  const atsScore =
    calculateATSScore(
      extractedSkills,
      jobDescription
    );

  /* =========================
     MISSING SKILLS
  ========================= */

   const missingSkills =
    detectMissingSkills(
    extractedSkills,
    jobDescription
    );

  /* =========================
     FAANG READINESS
  ========================= */

  const faangReadiness =
    calculateFAANGReadiness(
      atsScore,
      extractedSkills
    );
    console.log(
  "FAANG DEBUG:",
  {
    atsScore,
    extractedSkills,
    faangReadiness,
  }
);

  /* =========================
     FINAL RESPONSE
  ========================= */

  return {
     ...parsedResult,

    atsScore:
    atsScore || 0,

   extractedSkills:
    extractedSkills || [],

   missingSkills:
    missingSkills || [],

   faangReadiness:
    faangReadiness || 0,

    strengths: [
      "Good technical foundation",
      "Resume contains relevant technologies",
      "Profile shows strong growth potential",
    ],

    weaknesses:
      missingSkills,

    recommendations: [
      "Build more production-level projects",
      "Improve system design knowledge",
      "Practice DSA regularly",
      "Add measurable achievements in resume",
      "Contribute to open source projects",
    ],

    suggestedProjects: [
      "AI Interview Platform",
      "Realtime Chat Application",
      "Distributed Task Scheduler",
      "AI Resume Analyzer",
      "Scalable SaaS Dashboard",
    ],

    careerSuggestions: [
      "Frontend Engineer",
      "Full Stack Developer",
      "AI Engineer",
      "Software Development Engineer",
    ],

    interviewReadiness:
       faangReadiness >= 85
      ? "FAANG Ready"

      : faangReadiness >= 70
      ? "Strong Candidate"

      : faangReadiness >= 50
      ? "Moderately Ready"

      : "Needs Improvement",
  };
}



/* =========================================================
   PDF GENERATOR
========================================================= */

async function generatePdfFromHtml(
  htmlContent
) {

  const browser =
    await puppeteer.launch();

  const page =
    await browser.newPage();

  await page.setContent(
    htmlContent,
    {
      waitUntil:
        "networkidle0",
    }
  );

  const pdfBuffer =
    await page.pdf({
      format: "A4",

      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

  await browser.close();

  return pdfBuffer;
}



/* =========================================================
   RESUME PDF GENERATOR
========================================================= */

async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {

  const resumePdfSchema =
    z.object({
      html: z
        .string()
        .describe(
          "HTML resume content"
        ),
    });

  const prompt = `
Generate a professional ATS-friendly resume.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Requirements:
- modern
- ATS optimized
- professional
- concise
- realistic
- human-written style
`;

  const response =
    await ai.models.generateContent({
      model: geminiModel,

      contents: prompt,

      config: {
        responseMimeType:
          "application/json",

        responseSchema:
          zodToJsonSchema(
            resumePdfSchema
          ),
      },
    });

  const pdfRawText =
  typeof response.text === "function"
    ? response.text()
    : response.text;

  const jsonContent =
   JSON.parse(pdfRawText);

  const pdfBuffer =
    await generatePdfFromHtml(
      jsonContent.html
    );

  return pdfBuffer;
}

export {
  generateInterviewReport,
  generateResumePdf,
};
