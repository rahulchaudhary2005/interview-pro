import { analyzeResumeChain } from "../chains/resume.chain.js";

export const resumeAgent = async (
  resumeText
) => {

  try {

    const result =
      await analyzeResumeChain.invoke({
        resume: resumeText,
      });

    const text =
      result.content;

    const cleaned =
      text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(
      "RESUME AGENT ERROR:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
};