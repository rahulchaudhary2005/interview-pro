import {
  ai,
} from "../../services/llm.service.js";

import {
  SKILL_GAP_PROMPT,
  JOB_DESCRIPTION_SEPARATOR,
} from "../prompts/skillgap.prompt.js";

import {
  extractSkills,
} from "../tools/skillExtractor.tool.js";

import {
  semanticSkillMatch,
} from "../tools/semanticMatcher.tool.js";

import {
  generateDynamicRoadmap,
} from "../tools/roadmapGenerator.tool.js";

import {
  generateHFResponse,
} from "../models/huggingface.model.js";



/* =========================================
   CLEAN JSON RESPONSE
========================================= */

function cleanJSON(
  text
) {

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}



/* =========================================
   SAFE JSON PARSE
========================================= */

function safeParse(
  text
) {

  try {

    return JSON.parse(text);

  } catch {

    return null;
  }
}



/* =========================================
   FLATTEN SKILLS
========================================= */

function flattenSkills(
  obj
) {

  return Object
    .values(obj)
    .flat();
}



/* =========================================
   DEDUPLICATE ARRAY
========================================= */

function uniqueArray(
  arr
) {

  return [
    ...new Set(arr)
  ];
}



/* =========================================
   MATCH SCORE
========================================= */

function calculateMatchScore(
  matched,
  total
) {

  if (!total) {
    return 0;
  }

  return Math.round(
    (matched / total) * 100
  );
}



/* =========================================
   FAANG READINESS
========================================= */

function calculateReadiness(
  score
) {

  if (score >= 85) {
    return "High";
  }

  if (score >= 60) {
    return "Moderate";
  }

  return "Low";
}



/* =========================================
   SKILL GAP AGENT
========================================= */

export class SkillGapAgent {

  async analyze(
    resume,
    jobDescription
  ) {

    try {

      /* =====================================
         FULL AI PROMPT
      ===================================== */

      const prompt = `

${SKILL_GAP_PROMPT}

RESUME:

${resume}

${JOB_DESCRIPTION_SEPARATOR}

JOB DESCRIPTION:

${jobDescription}

IMPORTANT:
Return ONLY valid JSON.

JSON FORMAT:

{
  "roleTitle": "",
  "atsScore": 0,
  "matchScore": 0,
  "faangReadiness": "",

  "matchedSkills": [],
  "missingSkills": [],

  "strengths": [],
  "weaknesses": [],

  "recommendations": [],

  "careerSuggestions": [],

  "techStack": {
    "frontend": [],
    "backend": [],
    "database": [],
    "devops": [],
    "cloud": [],
    "ai": []
  }
}

`;



      /* =====================================
         PRIMARY AI = HUGGINGFACE
      ===================================== */

      let parsed = null;

      try {

        const hfResponse =
          await generateHFResponse(
            prompt
          );

        const cleanedHF =
          cleanJSON(
            hfResponse
          );

        parsed =
          safeParse(
            cleanedHF
          );

      } catch (hfError) {

        console.log(
          "HF ERROR:",
          hfError.message
        );
      }



      /* =====================================
         GEMINI FALLBACK
      ===================================== */

      if (!parsed) {

        try {

          const response =
            await ai.models.generateContent({

              model:
                "gemini-2.0-flash",

              contents:
                prompt,
            });

          const text =
            response.text;

          const cleaned =
            cleanJSON(text);

          parsed =
            safeParse(cleaned);

        } catch (geminiError) {

          console.log(
            "GEMINI FALLBACK ERROR:",
            geminiError.message
          );
        }
      }



      /* =====================================
         SUCCESS RESPONSE
      ===================================== */

      if (parsed) {

        return {

          success: true,

          source:
            "AI_ANALYSIS",

          roleTitle:
            parsed.roleTitle ||

            "AI Engineer",



          atsScore:
            parsed.atsScore || 0,



          matchScore:
            parsed.matchScore || 0,



          faangReadiness:
            parsed.faangReadiness ||

            "Moderate",



          matchedSkills:
            uniqueArray(
              parsed.matchedSkills || []
            ),



          missingSkills:
            uniqueArray(
              parsed.missingSkills || []
            ),



          strengths:
            parsed.strengths || [],



          weaknesses:
            parsed.weaknesses || [],



          recommendations:
            parsed.recommendations || [],



          careerSuggestions:
            parsed.careerSuggestions || [],



          techStack:
            parsed.techStack || {},
        };
      }

    } catch (error) {

      console.log(
        "AI PIPELINE ERROR:",
        error.message
      );
    }



    /**
     * =====================================
     * OFFLINE FALLBACK SYSTEM
     * =====================================
     */

    try {

      const jdSkills =
        extractSkills(
          jobDescription
        );

      const resumeSkills =
        extractSkills(
          resume
        );



      const jdFlat =
        flattenSkills(
          jdSkills
        );

      const resumeFlat =
        flattenSkills(
          resumeSkills
        );



      const uniqueJD =
        uniqueArray(jdFlat);

      const uniqueResume =
        uniqueArray(
          resumeFlat
        );



      const matchedSkills = [];

      const missingSkills = [];



      /* =====================================
         SEMANTIC MATCHING
      ===================================== */

      for (
        const skill of uniqueJD
      ) {

        const exactMatch =
          uniqueResume.some(

            (resumeSkill) =>

              resumeSkill
                .toLowerCase()
                .includes(
                  skill.toLowerCase()
                )
          );



        if (exactMatch) {

          matchedSkills.push(
            skill
          );

          continue;
        }



        const similarity =
          await semanticSkillMatch(

            skill,

            resume
          );



        console.log(
          `Skill: ${skill} | Similarity: ${similarity}`
        );



        if (
          similarity >= 0.72
        ) {

          matchedSkills.push(
            skill
          );

        } else {

          missingSkills.push(
            skill
          );
        }
      }



      const finalMatchedSkills =
        uniqueArray(
          matchedSkills
        );



      const finalMissingSkills =
        uniqueArray(
          missingSkills
        );



      const matchScore =
        calculateMatchScore(

          finalMatchedSkills.length,

          uniqueJD.length
        );



      const atsScore =
        Math.min(
          matchScore + 10,
          100
        );



      const faangReadiness =
        calculateReadiness(
          matchScore
        );



      const recommendations =
        generateDynamicRoadmap(

          jobDescription,

          finalMissingSkills,

          jdSkills
        );



      return {

        success: true,

        source:
          "OFFLINE_AI",



        roleTitle:
          "AI Analysis",



        atsScore,



        matchScore,



        faangReadiness,



        matchedSkills:
          finalMatchedSkills,



        missingSkills:
          finalMissingSkills,



        strengths:
          finalMatchedSkills.slice(
            0,
            5
          ),



        weaknesses:
          finalMissingSkills.slice(
            0,
            5
          ),



        recommendations,



        careerSuggestions: [

          "Improve missing technical skills",

          "Build production-grade projects",

          "Practice DSA regularly",

          "Focus on system design",

          "Improve interview communication",
        ],



        techStack: {

          frontend:
            jdSkills.frontend || [],

          backend:
            jdSkills.backend || [],

          database:
            jdSkills.database || [],

          devops:
            jdSkills.devops || [],

          cloud:
            jdSkills.cloud || [],

          ai:
            jdSkills.ai || [],
        },
      };

    } catch (offlineError) {

      console.log(
        "OFFLINE FALLBACK ERROR:",
        offlineError.message
      );



      return {

        success: false,

        error:
          offlineError.message,
      };
    }
  }
}