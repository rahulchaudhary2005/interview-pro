import { GoogleGenAI } from "@google/genai";
import { geminiApiKey } from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
});

export { ai };
