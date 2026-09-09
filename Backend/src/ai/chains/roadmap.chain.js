import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { geminiApiKey, langchainGeminiModel } from '../../config/env.js';

const model = new ChatGoogleGenerativeAI({
  apiKey: geminiApiKey,
  model: "gemini-1.5-flash",
});

const prompt = PromptTemplate.fromTemplate(`
Generate a complete learning roadmap.

Role:
{role}

Experience:
{experience}

Include:
1. Skills
2. DSA
3. Projects
4. Interview Prep
5. Timeline
6. Resources
7. Weekly Goals
`);

export const roadmapChain = prompt.pipe(model);
