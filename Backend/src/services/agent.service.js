import { GoogleGenAI } from "@google/genai";
import { geminiApiKey, geminiModel } from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
});

class InterviewAgent {
  constructor() {
    this.state = {
      jobDescription: "",
      resume: "",
      messages: [],
      recommendations: [],
      questions: [],
    };
  }

  async analyzeJob(jobDescription) {
    this.state.jobDescription = jobDescription;
    try {
      const response = await ai.models.generateContent({
        model: geminiModel,
        contents: `Analyze this job description and extract: skills, experience level, company culture signals, and must-haves. Return as JSON.\n\n${jobDescription}`,
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Job analysis error:", error.message);
      return { error: "Failed to analyze job" };
    }
  }

  async analyzeResume(resume) {
    this.state.resume = resume;
    try {
      const response = await ai.models.generateContent({
        model: geminiModel,
        contents: `Analyze this resume and extract: key skills, experience years, past roles, and achievements.\n\n${resume}`,
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Resume analysis error:", error.message);
      return { error: "Failed to analyze resume" };
    }
  }

  async generateRecommendations(jobAnalysis, resumeAnalysis) {
    try {
      const response = await ai.models.generateContent({
        model: geminiModel,
        contents: `Based on this job analysis ${JSON.stringify(
          jobAnalysis
        )} and resume analysis ${JSON.stringify(
          resumeAnalysis
        )}, provide 5 specific preparation recommendations as a JSON array.`,
      });

      this.state.recommendations = JSON.parse(response.text);
      return this.state.recommendations;
    } catch (error) {
      console.error("Recommendations error:", error.message);
      return [];
    }
  }

  async generateQuestions(jobAnalysis, resumeAnalysis) {
    try {
      const response = await ai.models.generateContent({
        model: geminiModel,
        contents: `For a candidate with ${JSON.stringify(
          resumeAnalysis
        )} applying to a role requiring ${JSON.stringify(
          jobAnalysis
        )}, generate 5 interview questions (2 technical, 2 behavioral, 1 system design) as JSON array.`,
      });

      this.state.questions = JSON.parse(response.text);
      return this.state.questions;
    } catch (error) {
      console.error("Questions generation error:", error.message);
      return [];
    }
  }

  async answerQuery(query, context) {
    try {
      const response = await ai.models.generateContent({
        model: geminiModel,
        contents: `You are helpful interview preparation assistant. Answer using the provided context.\n\nContext: ${context}\n\nQuestion: ${query}\n\nProvide a concise, actionable answer.`,
      });
      return response.text;
    } catch (error) {
      console.error("Query answer error:", error.message);
      return "Sorry, I couldn't process your query.";
    }
  }

  async runFullInterviewPrep(jobDescription, resume) {
    try {
      const jobAnalysis = await this.analyzeJob(jobDescription);
      const resumeAnalysis = await this.analyzeResume(resume);
      const recommendations = await this.generateRecommendations(
        jobAnalysis,
        resumeAnalysis
      );
      const questions = await this.generateQuestions(jobAnalysis, resumeAnalysis);

      return {
        jobAnalysis,
        resumeAnalysis,
        recommendations,
        questions,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export { InterviewAgent };
