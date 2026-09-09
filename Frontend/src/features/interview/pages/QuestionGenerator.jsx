import React, { useState } from "react";

import {
  BrainCircuit,
  Upload,
  Sparkles,
  Building2,
  Briefcase,
  Layers3,
} from "lucide-react";
import {
  generateAIQuestions,
} from "../services/interview.api";

import "../style/questionGenerator.scss";

const QuestionGenerator = () => {

  /**
   * =====================================
   * FORM STATE
   * =====================================
   */

  const [formData, setFormData] =
    useState({
      company: "",
      role: "",
      level: "",
      jd: "",
      resume: null,
    });



  /**
   * =====================================
   * LOADING + ERROR
   * =====================================
   */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [generatedQuestions,
    setGeneratedQuestions] =
    useState(null);



  /**
   * =====================================
   * HANDLE INPUT CHANGE
   * =====================================
   */

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };



  /**
   * =====================================
   * FILE CHANGE
   * =====================================
   */

  const handleFileChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };



  /**
   * =====================================
   * GENERATE QUESTIONS
   * =====================================
   */
  const handleGenerateQuestions =
    async () => {

      try {

        setLoading(true);

        setError("");



        /**
         * CALL REAL AI BACKEND
         */

        const response =
          await generateAIQuestions({

            jd: formData.jd,

            role: formData.role,

            level: formData.level,

            resumeFile:
              formData.resume,
          });



        console.log(
          "AI Response:",
          response
        );



        /**
         * BACKEND RESPONSE
         */

        const aiQuestions =
          response.interviewReport;



        setGeneratedQuestions({

          technical:
            aiQuestions.technicalQuestions || [],

          behavioral:
            aiQuestions.behavioralQuestions || [],

          dsa:
            aiQuestions.dsaQuestions || [],

          systemDesign:
            aiQuestions.systemDesignQuestions || [],
        });

      }
      catch (err) {

        console.log(err);

        setError(
          err?.response?.data?.message ||
          "Failed to generate questions"
        );
      }
      finally {

        setLoading(false);
      }
    };

  // const handleGenerateQuestions =
  //   async () => {

  //     try {

  //       setLoading(true);

  //       setError("");



  //       /**
  //        * TEMP MOCK AI RESPONSE
  //        * (avoids Gemini quota issue)
  //        */

  //       await new Promise(
  //         (resolve) =>
  //           setTimeout(resolve, 2000)
  //       );



  //       const mockResponse = {

  //         technical: [
  //           "Explain Transformer Architecture.",
  //           "How does RAG improve LLM accuracy?",
  //           "Difference between CNN and RNN?",
  //         ],

  //         dsa: [
  //           "Solve Graph Traversal problem.",
  //           "Implement Sliding Window algorithm.",
  //         ],

  //         systemDesign: [
  //           "Design ChatGPT backend.",
  //           "Design scalable vector database.",
  //         ],

  //         behavioral: [
  //           "Tell me about a conflict.",
  //           "Describe leadership experience.",
  //         ],
  //       };



  //       setGeneratedQuestions(
  //         mockResponse
  //       );



  //       console.log(
  //         "Generated Questions:",
  //         mockResponse
  //       );

  //     }
  //     catch (err) {

  //       console.log(err);

  //       setError(
  //         "Failed to generate questions"
  //       );
  //     }
  //     finally {

  //       setLoading(false);
  //     }
  //   };



  return (
    <div className="question-generator">

      {/* HERO */}

      <div className="generator-hero">

        <div className="hero-content">

          <div className="hero-badge">

            <Sparkles size={16} />

            <span>
              AI Powered Interview Engine
            </span>

          </div>

          <h1>
            Generate FAANG-Level
            Interview Questions
          </h1>

          <p>
            AI-powered dynamic interview
            simulation using LangGraph,
            RAG, HuggingFace and
            advanced evaluation systems.
          </p>

        </div>

      </div>



      {/* MAIN GRID */}

      <div className="generator-layout">

        {/* LEFT PANEL */}

        <div className="generator-form">

          <div className="form-card">

            <div className="card-title">

              <BrainCircuit size={22} />

              <span>
                Interview Configuration
              </span>

            </div>



            {/* COMPANY */}

            <div className="input-group">

              <label>
                Target Company
              </label>

              <div className="input-wrapper">

                <Building2 size={18} />

                <input
                  type="text"
                  placeholder="Google, Amazon, OpenAI..."
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />

              </div>

            </div>



            {/* ROLE */}

            <div className="input-group">

              <label>
                Role
              </label>

              <div className="input-wrapper">

                <Briefcase size={18} />

                <input
                  type="text"
                  placeholder="Frontend Engineer"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />

              </div>

            </div>



            {/* LEVEL */}

            <div className="input-group">

              <label>
                Difficulty Level
              </label>

              <div className="input-wrapper">

                <Layers3 size={18} />

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Level
                  </option>

                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                  <option value="FAANG">
                    FAANG
                  </option>

                </select>

              </div>

            </div>



            {/* JOB DESCRIPTION */}

            <div className="input-group">

              <label>
                Job Description
              </label>

              <textarea
                placeholder="Paste complete job description..."
                name="jd"
                value={formData.jd}
                onChange={handleChange}
              />

            </div>



            {/* FILE */}

            <label className="upload-box">

              <Upload size={28} />

              <p>
                Upload Resume
              </p>

              <span>
                PDF / DOCX Supported
              </span>

              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />

            </label>



            {/* BUTTON */}

            <button
              className="generate-btn"
              onClick={
                handleGenerateQuestions
              }
              disabled={loading}
            >

              <Sparkles size={20} />

              {
                loading
                  ? "Generating..."
                  : "Generate Questions"
              }

            </button>



            {/* ERROR */}

            {
              error && (

                <div className="error-box">

                  {error}

                </div>
              )
            }

          </div>

        </div>



        {/* RIGHT PANEL */}

        {/* RIGHT PANEL */}

        <div className="generator-preview">

          <div className="preview-card">

            <div className="preview-header">

              <h2>
                AI Generated Questions
              </h2>

            </div>



            {
              generatedQuestions ? (

                <div className="preview-grid">

                  {/* TECHNICAL */}

                  <div className="preview-item">

                    <span>
                      Technical Questions
                    </span>

                    {
                      generatedQuestions
                        .technical
                        ?.map((q, i) => (

                          <div
                            key={i}
                            className="question-box"
                          >

                            <h4>
                              {q?.question}
                            </h4>

                            <p>

                              <strong>
                                Intention:
                              </strong>

                              {
                                q?.intention
                              }

                            </p>

                            <p>

                              <strong>
                                Expected Answer:
                              </strong>

                              {
                                q?.answer
                              }

                            </p>

                          </div>
                        ))
                    }

                  </div>



                  {/* DSA */}

                  <div className="preview-item">

                    <span>
                      DSA Questions
                    </span>

                    {
                      generatedQuestions
                        .dsa
                        ?.map((q, i) => (

                          <div
                            key={i}
                            className="question-box"
                          >

                            <h4>
                              {q?.question}
                            </h4>

                            <p>

                              <strong>
                                Intention:
                              </strong>

                              {
                                q?.intention
                              }

                            </p>

                            <p>

                              <strong>
                                Expected Answer:
                              </strong>

                              {
                                q?.answer
                              }

                            </p>

                          </div>
                        ))
                    }

                  </div>



                  {/* SYSTEM DESIGN */}

                  <div className="preview-item">

                    <span>
                      System Design
                    </span>

                    {
                      generatedQuestions
                        .systemDesign
                        ?.map((q, i) => (

                          <div
                            key={i}
                            className="question-box"
                          >

                            <h4>
                              {q?.question}
                            </h4>

                            <p>

                              <strong>
                                Intention:
                              </strong>

                              {
                                q?.intention
                              }

                            </p>

                            <p>

                              <strong>
                                Expected Answer:
                              </strong>

                              {
                                q?.answer
                              }

                            </p>

                          </div>
                        ))
                    }

                  </div>



                  {/* BEHAVIORAL */}

                  <div className="preview-item">

                    <span>
                      Behavioral Questions
                    </span>

                    {
                      generatedQuestions
                        .behavioral
                        ?.map((q, i) => (

                          <div
                            key={i}
                            className="question-box"
                          >

                            <h4>
                              {q?.question}
                            </h4>

                            <p>

                              <strong>
                                Intention:
                              </strong>

                              {
                                q?.intention
                              }

                            </p>

                            <p>

                              <strong>
                                Expected Answer:
                              </strong>

                              {
                                q?.answer
                              }

                            </p>

                          </div>
                        ))
                    }

                  </div>

                </div>

              ) : (

                <div className="empty-state">

                  <Sparkles size={40} />

                  <p>
                    AI generated interview
                    questions will appear here.
                  </p>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default QuestionGenerator;