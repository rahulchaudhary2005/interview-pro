import "./src/config/env.js";
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";
import { config } from "./src/config/env.js";

const startServer = async () => {
  try {
    await connectToDB();
  } catch (error) {
    console.warn("⚠️ Continuing server startup without database connection.");
  }

  app.listen(config.port, () => {
    console.log(`🚀 Server is running on port ${config.port}`);
  });
};

startServer();