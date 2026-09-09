import { GoogleGenAI } from "@google/genai";
import { geminiApiKey, geminiModel } from "../../config/env.js";

const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

export const ensureGeminiClient = () => {
    if (!ai) {
        throw new Error("GEMINI_API_KEY is missing. Set GEMINI_API_KEY or GOOGLE_API_KEY in your .env file.");
    }
    return ai;
};

export const generateGeminiContent = async (prompt, model = geminiModel) => {
    const client = ensureGeminiClient();
    return client.models.generateContent({
        model,
        contents: prompt,
    });
};

export default ai;