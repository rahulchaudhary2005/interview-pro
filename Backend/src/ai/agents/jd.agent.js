// import { ai } from "../../services/llm.service.js";
// import { JD_ANALYZER_PROMPT } from "../prompts/jd.prompts.js";

// // Fallback mock response for quota exceeded scenarios
// // const getMockAnalysis = (jobDescription) => {
// //   return {
// //     roleTitle: "Full Stack Developer (AI/ML Focus)",
// //     experienceLevel: "Senior",
// //     difficultyLevel: "Hard",
// //     companyType: "Tech/AI Startup",
// //     requiredSkills: [
// //       "JavaScript/TypeScript",
// //       "React",
// //       "Node.js",
// //       "Python",
// //       "Machine Learning",
// //       "LLM Integration",
// //       "Docker",
// //       "AWS",
// //       "MongoDB",
// //       "RAG Systems"
// //     ],
// //     softSkills: [
// //       "Problem Solving",
// //       "Communication",
// //       "Teamwork",
// //       "Quick Learning",
// //       "Technical Writing"
// //     ],
// //     techStack: {
// //       frontend: ["React", "TypeScript", "Vite", "SCSS"],
// //       backend: ["Node.js", "Express", "FastAPI"],
// //       database: ["MongoDB", "PostgreSQL", "Vector DB"],
// //       devops: ["Docker", "Kubernetes", "CI/CD"],
// //       cloud: ["AWS", "GCP", "Azure"],
// //       ai: ["LangChain", "RAG", "Gemini API", "PyTorch"]
// //     },
// //     prioritySkills: {
// //       high: ["System Design", "LLM Integration", "Full Stack"],
// //       medium: ["Docker/Kubernetes", "Cloud Deployment"],
// //       low: ["Mobile Development", "GraphQL"]
// //     },
// //     responsibilities: [
// //       "Design and implement AI-powered backend services",
// //       "Build scalable frontend interfaces",
// //       "Optimize ML model performance",
// //       "Lead system architecture discussions"
// //     ],
// //     interviewFocusAreas: [
// //       "System Design for AI Applications",
// //       "LLM Integration & RAG Pipelines",
// //       "Full Stack Scaling",
// //       "DSA & Algorithms",
// //       "Production ML Deployment"
// //     ],
// //     preparationStrategy: [
// //       "Master advanced DSA (Graphs, DP)",
// //       "Study LLM architectures and fine-tuning",
// //       "Build end-to-end AI projects",
// //       "Practice system design interviews",
// //       "Mock interviews with senior engineers"
// //     ],
// //     roadmap: [
// //       "Week 1: Advanced DSA & Fundamentals",
// //       "Week 2: LLM Theory & RAG Implementation",
// //       "Week 3: Full Stack AI Integration",
// //       "Week 4: Mock Interviews & Polish"
// //     ],
// //     note: "Mock analysis (API quota exceeded). Please verify with manual analysis."
// //   };
// // };

// export class JDAgent {
//   async analyze(jobDescription, maxRetries = 3) {
//     try {
//       const prompt = `
// ${JD_ANALYZER_PROMPT}

// ${jobDescription}
// `;

//       for (let attempt = 0; attempt < maxRetries; attempt++) {
//         try {
//           const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: prompt,
//           });

//           const text = response.text;

//           const cleaned = text
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .trim();

//           return {
//             success: true,
//             data: JSON.parse(cleaned),
//             source: "API"
//           };
//         } catch (error) {
//           // Handle rate limiting with exponential backoff
//           if (error.status === 429) {
//             const retryAfter = error.response?.['retryDelay'] || Math.pow(2, attempt) * 1000;
//             console.log(`Rate limited. Attempt ${attempt + 1}/${maxRetries}. Waiting ${retryAfter}ms...`);
            
//             if (attempt < maxRetries - 1) {
//               await new Promise(resolve => setTimeout(resolve, retryAfter));
//               continue;
//             } else {
//               console.log("Max retries exceeded. Using mock analysis.");
//               return {
//                 success: true,
//                 data: getMockAnalysis(jobDescription),
//                 source: "MOCK",
//                 warning: "API quota exceeded. Using generated analysis as reference."
//               };
//             }
//           }
//           throw error;
//         }
//       }
//     } catch (error) {
//       console.error("JD Analysis Error:", error.message);

//       return {
//         success: true,
//         data: getMockAnalysis(jobDescription),
//         source: "MOCK",
//         warning: `Analysis failed: ${error.message}. Using generated analysis as reference.`,
//         error: error.message
//       };
//     }
//   }
// }

// const jdAgentInstance = new JDAgent();

// export const jdAgent = async (jobDescription) => {
//   const result = await jdAgentInstance.analyze(jobDescription);

//   return result.data || result;
// };
import { ai } from "../../services/llm.service.js";

import {
  JD_ANALYZER_PROMPT,
} from "../prompts/jd.prompts.js";

import {
  jdAnalyzerChain,
} from "../chains/jd.chain.js";

import {
  geminiModel,
} from "../../config/env.js";



/* =========================================
   SAFE ARRAY
========================================= */

function safeArray(value) {

  if (
    Array.isArray(value)
  ) {
    return value.filter(Boolean);
  }

  return [];
}



/* =========================================
   SAFE OBJECT
========================================= */

function safeObject(value) {

  if (
    typeof value === "object" &&
    value !== null
  ) {
    return value;
  }

  return {};
}



/* =========================================
   NORMALIZE TECH STACK
========================================= */

function normalizeTechStack(
  techStack
) {

  return {

    frontend:
      safeArray(
        techStack?.frontend
      ),

    backend:
      safeArray(
        techStack?.backend
      ),

    database:
      safeArray(
        techStack?.database
      ),

    devops:
      safeArray(
        techStack?.devops
      ),

    cloud:
      safeArray(
        techStack?.cloud
      ),

    ai:
      safeArray(
        techStack?.ai
      ),
  };
}



/* =========================================
   GENERATE AI INSIGHTS
========================================= */

function generateInsights(
  data
) {

  const allSkills = [

    ...safeArray(
      data.requiredSkills
    ),

    ...safeArray(
      data.matchedSkills
    ),
  ];



  const isAIRole =
    allSkills.some((skill) =>

      skill
        ?.toLowerCase()
        ?.includes("ai") ||

      skill
        ?.toLowerCase()
        ?.includes("machine learning") ||

      skill
        ?.toLowerCase()
        ?.includes("llm")
    );



  const isBackendHeavy =
    allSkills.some((skill) =>

      [
        "node",
        "express",
        "microservices",
        "redis",
        "kafka",
      ].some((keyword) =>

        skill
          ?.toLowerCase()
          ?.includes(keyword)
      )
    );



  return {

    careerPath:
      isAIRole

        ? "Generative AI Engineer"

        : isBackendHeavy

          ? "Backend Engineer"

          : "Full Stack Engineer",



    interviewDifficulty:

      data.difficultyLevel ||

      "Medium",



    hiringProbability:

      data.matchScore >= 85

        ? "Very High"

        : data.matchScore >= 70

          ? "Medium"

          : "Low",
  };
}



/* =========================================
   TRANSFORM ANALYSIS
========================================= */

function transformAnalysis(
  data
) {

  const normalizedTechStack =
    normalizeTechStack(
      data.techStack || {}
    );



  const recommendedTechStack = [

    ...normalizedTechStack.frontend,

    ...normalizedTechStack.backend,

    ...normalizedTechStack.database,

    ...normalizedTechStack.devops,

    ...normalizedTechStack.cloud,

    ...normalizedTechStack.ai,
  ];



  const uniqueTechStack =
    [
      ...new Set(
        recommendedTechStack
      ),
    ];



  const insights =
    generateInsights(data);



  return {

    /* =====================================
       BASIC INFO
    ===================================== */

    roleTitle:

      data.roleTitle ||

      "Software Engineer",



    experienceLevel:

      data.experienceLevel ||

      "Intermediate",



    difficultyLevel:

      data.difficultyLevel ||

      "Medium",



    companyType:

      data.companyType ||

      "Tech Company",



    /* =====================================
       AI GENERATED SCORES
    ===================================== */

    matchScore:

      Number(
        data.matchScore
      ) || 0,



    atsScore:

      Number(
        data.atsScore
      ) || 0,



    faangReadiness:

      data.faangReadiness ||

      "Medium",



    /* =====================================
       SKILL ANALYSIS
    ===================================== */

    matchedSkills:

      safeArray(
        data.matchedSkills
      ),



    missingSkills:

      safeArray(
        data.missingSkills
      ),



    requiredSkills:

      safeArray(
        data.requiredSkills
      ),



    softSkills:

      safeArray(
        data.softSkills
      ),



    /* =====================================
       TECH STACK
    ===================================== */

    recommendedTechStack:
      uniqueTechStack,



    techStack:
      normalizedTechStack,



    /* =====================================
       PRIORITY SKILLS
    ===================================== */

    prioritySkills:
      safeObject(
        data.prioritySkills
      ),



    /* =====================================
       RESPONSIBILITIES
    ===================================== */

    responsibilities:

      safeArray(
        data.responsibilities
      ),



    /* =====================================
       INTERVIEW PREPARATION
    ===================================== */

    interviewFocusAreas:

      safeArray(
        data.interviewFocusAreas
      ),



    preparationStrategy:

      safeArray(
        data.preparationStrategy
      ),



    roadmap:

      safeArray(
        data.roadmap
      ),



    /* =====================================
       EXTRA AI INSIGHTS
    ===================================== */

    aiInsights:
      insights,
  };
}



/* =========================================
   JD AGENT
========================================= */

export class JDAgent {

  async analyze(
    jobDescription
  ) {

    try {

      /* =====================================
         LANGCHAIN ANALYSIS
      ===================================== */

      const chainResult =
        await jdAnalyzerChain.invoke({

          jobDescription,
        });



      const transformed =
        transformAnalysis(
          chainResult
        );



      return {

        success: true,

        source:
          "LANGCHAIN",

        data:
          transformed,
      };

    } catch (chainError) {

      console.log(
        "LANGCHAIN JD ERROR:",
        chainError.message
      );



      try {

        /* =====================================
           GEMINI FALLBACK
        ===================================== */

        const prompt = `

${JD_ANALYZER_PROMPT}

JOB DESCRIPTION:

${jobDescription}

IMPORTANT:
Return ONLY valid JSON.

`;



        const response =
          await ai.models.generateContent({

            model:
              geminiModel,

            contents:
              prompt,
          });



        const text =
          response.text;



        const cleaned =
          text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();



        const parsed =
          JSON.parse(cleaned);



        const transformed =
          transformAnalysis(
            parsed
          );



        return {

          success: true,

          source:
            "GEMINI_FALLBACK",

          data:
            transformed,
        };

      } catch (fallbackError) {

        console.log(
          "JD ANALYSIS ERROR:",
          fallbackError.message
        );



        return {

          success: false,

          source:
            "FAILED",

          error:
            fallbackError.message,
        };
      }
    }
  }
}