import {
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";

import {
  geminiApiKey,
} from "../../config/env.js";

import {
  INTERVIEW_SYSTEM_PROMPT,
  INTERVIEW_GENERATION_PROMPT,
  ANSWER_EVALUATION_PROMPT,
} from "../prompts/interview.prompts.js";
import { generateHFResponse } from "../models/huggingface.model.js";



/* =========================================
   MODEL
========================================= */

const model =
  new ChatGoogleGenerativeAI({

    apiKey:
      geminiApiKey,

    model:
      "gemini-2.0-flash",

    temperature:
      0.7,
  });



/* =========================================
   CLEAN JSON
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
   GENERATE INTERVIEW QUESTIONS
========================================= */

export async function
  generateInterviewChain({

    resume,
    jd,
    role,
    level,
  }) {

  try {

    /**
     * =====================================
     * DIRECT STRING PROMPT
     * =====================================
     */

    const finalPrompt = `

${INTERVIEW_SYSTEM_PROMPT}

${INTERVIEW_GENERATION_PROMPT}

=========================================
RESUME
=========================================

${resume}

=========================================
JOB DESCRIPTION
=========================================

${jd}

=========================================
ROLE
=========================================

${role}

=========================================
LEVEL
=========================================

${level}

`;



    const response =
      await model.invoke(
        finalPrompt
      );



    const cleaned =
      cleanJSON(
        response.content
      );



    return JSON.parse(
      cleaned
    );

  } catch (error) {

    console.log(
      "INTERVIEW CHAIN ERROR:",
      error.message
    );

    throw error;
  }
}



/* =========================================
   ANSWER EVALUATION
========================================= */

export async function
  evaluateAnswerChain({

    question,
    answer,
  }) {

  try {

    const finalPrompt = `

${ANSWER_EVALUATION_PROMPT}

=========================================
QUESTION
=========================================

${question}

=========================================
ANSWER
=========================================

${answer}

`;



    const response =
      await generateHFResponse(
        finalPrompt
      );



    const cleaned =
      cleanJSON(
        response.content
      );



    return JSON.parse(
      cleaned
    );

  } catch (error) {

    console.log(
      "ANSWER EVALUATION ERROR:",
      error.message
    );

    throw error;
  }
}