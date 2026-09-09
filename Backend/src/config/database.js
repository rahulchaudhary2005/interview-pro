import mongoose from "mongoose";
import { config } from "./env.js";

const connectToDB = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });

    console.log("✅ MongoDB Connected");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed. App will continue in degraded mode.");
    console.error(error.message);
    return false;
  }
};

export default connectToDB;