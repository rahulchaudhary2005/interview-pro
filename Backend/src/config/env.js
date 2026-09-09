import "dotenv/config";

const getFirstSetValue = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
};

const geminiApiKey = getFirstSetValue(
  process.env.GEMINI_API_KEY,
  process.env.GOOGLE_API_KEY,
  process.env.GOOGLE_GENAI_API_KEY,
  process.env.GEMINI_API_URL
);

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interview-assistant",
  geminiApiKey,
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  langchainGeminiModel: process.env.LANGCHAIN_GEMINI_MODEL || "gemini-2.0-flash",
};

export const {
  port,
  mongoUri,
  huggingfaceApiKey,
  geminiModel,
  langchainGeminiModel,
} = config;

export { geminiApiKey };

if (!config.mongoUri) {
  console.error("❌ MONGO_URI is missing");
}

if (!config.geminiApiKey) {
  console.warn("⚠️ GEMINI_API_KEY is missing. AI features will not work until it is set.");
}

if (!config.huggingfaceApiKey) {
  console.warn("⚠️ HUGGINGFACE_API_KEY is missing");
}