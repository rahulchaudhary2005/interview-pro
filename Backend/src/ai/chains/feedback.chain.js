import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { geminiApiKey, langchainGeminiModel } from '../../config/env.js';

const model = new ChatGoogleGenerativeAI({
  apiKey: geminiApiKey,
  model: "gemini-1.5-flash",
});

export const feedbackChain = {
  invoke: async ({ question, answer }) => {
    return await model.invoke(`
Evaluate this interview answer.

Question:
${question}

Answer:
${answer}

Provide:
1. Technical score
2. Communication score
3. Improvements
4. Better answer
`);
  },
};
