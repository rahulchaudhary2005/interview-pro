// import {
//   PromptTemplate,
// } from "@langchain/core/prompts";

// import {
//   JsonOutputParser,
// } from "@langchain/core/output_parsers";

// import {
//   ChatGoogleGenerativeAI,
// } from "@langchain/google-genai";

// import {
//   geminiApiKey,
//   geminiModel,
// } from "../../config/env.js";

// /* =========================================
//    GEMINI MODEL
// ========================================= */

// const model =
//   new ChatGoogleGenerativeAI({

//     apiKey:
//       geminiApiKey,

//     model:
//       geminiModel,

//     temperature: 0.3,
//   });

// /* =========================================
//    JSON PARSER
// ========================================= */

// const parser =
//   new JsonOutputParser();

// /* =========================================
//    JD PROMPT
// ========================================= */

// const jdPrompt =
//   PromptTemplate.fromTemplate(`

// You are an elite FAANG-level AI hiring system.

// Analyze the provided Job Description carefully.

// Return ONLY valid JSON.

// JSON FORMAT:

// {{
//   "roleTitle": "",
//   "experienceLevel": "",
//   "difficultyLevel": "",
//   "companyType": "",

//   "requiredSkills": [],

//   "softSkills": [],

//   "techStack": {{
//     "frontend": [],
//     "backend": [],
//     "database": [],
//     "devops": [],
//     "cloud": [],
//     "ai": []
//   }},

//   "prioritySkills": {{
//     "high": [],
//     "medium": [],
//     "low": []
//   }},

//   "responsibilities": [],

//   "interviewFocusAreas": [],

//   "preparationStrategy": [],

//   "roadmap": []
// }}

// IMPORTANT RULES:

// - Return ONLY JSON
// - No markdown
// - No explanation
// - No extra text
// - Extract only skills found in JD
// - Categorize technologies properly

// JOB DESCRIPTION:

// {jobDescription}

// `);

// /* =========================================
//    CHAIN
// ========================================= */

// export const jdAnalyzerChain =

//   jdPrompt
//     .pipe(model)
//     .pipe(parser);

import {
  PromptTemplate,
} from "@langchain/core/prompts";

import {
  JsonOutputParser,
} from "@langchain/core/output_parsers";

// import {
//   ChatGoogleGenerativeAI,
// } from "@langchain/google-genai";

import {
  geminiApiKey,
  geminiModel,
} from "../../config/env.js";

import {
  generateHFResponse,
} from "../models/huggingface.model.js";




/* =========================================
   GEMINI MODEL
========================================= */

// const model =
//   new ChatGoogleGenerativeAI({

//     apiKey:
//       geminiApiKey,

//     model:
//       geminiModel ||

//       "gemini-2.0-flash",

//     temperature: 0.2,
//   });



/* =========================================
   JSON PARSER
========================================= */

const parser =
  new JsonOutputParser();



/* =========================================
   JD ANALYZER PROMPT
========================================= */

const jdPrompt =
  PromptTemplate.fromTemplate(`

You are an elite FAANG-level AI hiring system,
ATS analyzer,
technical recruiter,
and senior engineering interviewer.

Analyze the provided Job Description deeply.

Return ONLY valid JSON.

STRICT JSON FORMAT:

{{
  "roleTitle": "",
  "experienceLevel": "",
  "difficultyLevel": "",
  "companyType": "",

  "matchScore": 0,
  "atsScore": 0,
  "faangReadiness": "",

  "matchedSkills": [],

  "missingSkills": [],

  "requiredSkills": [],

  "softSkills": [],

  "recommendedTechStack": [],

  "techStack": {{
    "frontend": [],
    "backend": [],
    "database": [],
    "devops": [],
    "cloud": [],
    "ai": []
  }},

  "prioritySkills": {{
    "high": [],
    "medium": [],
    "low": []
  }},

  "responsibilities": [],

  "interviewFocusAreas": [],

  "preparationStrategy": [],

  "roadmap": []
}}

IMPORTANT RULES:

- Return ONLY valid JSON
- Do NOT return markdown
- Do NOT return explanation
- Do NOT use triple backticks
- Generate realistic ATS score
- Generate realistic FAANG readiness
- Generate semantic skill analysis
- Infer missing skills intelligently
- Infer recommended tech stack dynamically
- Think like senior FAANG recruiter
- Think deeply before answering
- Every array must contain useful values
- Scores must be realistic
- Never leave important fields empty

JOB DESCRIPTION:

{jobDescription}

`);



/* =========================================
   JD ANALYZER CHAIN
========================================= */

export async function
  jdAnalyzerChain({
    jobDescription,
  }) {

  const formattedPrompt =
    await jdPrompt.format({

      jobDescription,
    });



  const response =
    await generateHFResponse(
      formattedPrompt
    );



  const cleaned =
    response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();



  return JSON.parse(cleaned);
}