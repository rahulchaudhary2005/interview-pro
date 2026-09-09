import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { geminiApiKey, langchainGeminiModel } from '../../config/env.js';


const model = new ChatGoogleGenerativeAI({
  apiKey: geminiApiKey,
  model: "gemini-1.5-flash",
});

const prompt = PromptTemplate.fromTemplate(`
Context:
{context}

Question:
{query}

Answer deeply.
`);

export const ragChain = prompt.pipe(model);
