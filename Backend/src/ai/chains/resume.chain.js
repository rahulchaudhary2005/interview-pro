import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { geminiApiKey, langchainGeminiModel } from '../../config/env.js';

const model = new ChatGoogleGenerativeAI({
  apiKey: geminiApiKey,
  model: "gemini-1.5-flash",
});

const prompt = PromptTemplate.fromTemplate(`
You are an advanced ATS AI system.

Analyze the resume deeply.

Resume:
{resume}

Return ONLY valid JSON.

{
  "atsScore": 0,
  "experienceLevel": "",
  "strengths": [],
  "missingSkills": [],
  "projects": [],
  "recommendations": [],
  "faangReadiness": ""
}
`);

export const analyzeResumeChain = prompt.pipe(model);
