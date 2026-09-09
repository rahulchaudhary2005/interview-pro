import { useState } from "react";

import {
  analyzeSkillGapAPI,
} from "../services/llm.api";

import {
  parseResumeAPI,
} from "../services/resume.api";

import {
  Briefcase,
  Sparkles,
  Brain,
  Code2,
  Target,
  Loader2,
  AlertCircle,
  Upload,
} from "lucide-react";

import {
  FaReact,
  FaNodeJs,
  FaBrain,
  FaDatabase,
} from "react-icons/fa";

import "./JDAnalyzer.css";

const JDAnalyzer = () => {

  const [jobDescription, setJobDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState(null);

  const [error, setError] =
    useState(null);

  const [resumeFile, setResumeFile] =
    useState(null);

  const [resumeText, setResumeText] =
    useState("");

  const handleAnalyze = async () => {

    if (!jobDescription.trim()) {

      setError(
        "Please paste Job Description"
      );

      return;
    }

    try {

      setLoading(true);

      setError(null);

      let extractedResume = "";

      /* ===========================
         PARSE RESUME
      =========================== */

      if (resumeFile) {

        const parsedResume =
          await parseResumeAPI(
            resumeFile
          );

        extractedResume =
          parsedResume.text;

        setResumeText(
          extractedResume
        );
      }

      /* ===========================
         SKILL GAP ANALYSIS
      =========================== */

      const response =
        await analyzeSkillGapAPI(
          extractedResume,
          jobDescription
        );

      if (
        response?.analysis
      ) {

        setAnalysis(
          response.analysis
        );

      } else {

        setError(
          "No analysis generated."
        );
      }

    } catch (error) {

      console.log(error);

      setError(
        error?.response?.data?.message ||
        error.message ||
        "Analysis failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="jd-page">

      {/* HERO */}

      <div className="jd-hero">

        <div className="jd-badge">
          <Sparkles size={14} />
          AI Resume Intelligence
        </div>

        <h1>
          Resume + <span>JD Analyzer</span>
        </h1>

        <p>
          Upload your resume and compare it with
          the Job Description using AI-powered
          semantic skill gap analysis.
        </p>

      </div>

      {/* MAIN CONTAINER */}

      <div className="jd-container">

        {/* ======================================
            TOP SECTION
        ====================================== */}

        <div className="jd-top-section">

          {/* LEFT PANEL */}

          <div className="jd-input-card">

            <div className="card-header">
              <Briefcase size={18} />
              <h2>Job Description</h2>
            </div>

            {/* TEXTAREA */}

            <textarea
              rows={12}
              placeholder="Paste complete Job Description here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
            />

            {/* RESUME */}

            <div className="resume-upload">

              <label className="upload-box">

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={(e) =>
                    setResumeFile(
                      e.target.files[0]
                    )
                  }
                />

                <div className="upload-content">

                  <Upload size={18} />

                  <div>

                    <h4>
                      {
                        resumeFile
                          ? resumeFile.name
                          : "Upload Resume"
                      }
                    </h4>

                    <p>
                      PDF / DOC / DOCX
                    </p>

                  </div>

                </div>

              </label>

            </div>

            {/* ERROR */}

            {error && (

              <div className="error-message">

                <AlertCircle size={16} />

                <span>{error}</span>

              </div>
            )}

            {/* BUTTON */}

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >

              {loading ? (
                <>
                  <Loader2
                    className="spin"
                    size={18}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain size={18} />
                  Analyze Resume Match
                </>
              )}

            </button>

          </div>

          {/* RIGHT MINI PANEL */}

          <div className="jd-mini-card">

            <div className="mini-header">
              <Brain size={18} />
              <h3>AI Capabilities</h3>
            </div>

            <div className="capability-list">

              <div className="capability-item">
                ATS Resume Match
              </div>

              <div className="capability-item">
                Semantic Skill Detection
              </div>

              <div className="capability-item">
                Missing Skills Analysis
              </div>

              <div className="capability-item">
                FAANG Readiness
              </div>

              <div className="capability-item">
                Dynamic Roadmap
              </div>

              <div className="capability-item">
                AI Tech Stack Detection
              </div>

            </div>

          </div>

        </div>

        {/* ======================================
            ANALYSIS SECTION
        ====================================== */}

        {analysis && (

          <div className="jd-result-card">

            <div className="analysis-content">

              {/* HEADER */}

              <div className="analysis-header">

                <h2>
                  {
                    analysis.roleTitle ||
                    "AI Analysis"
                  }
                </h2>

                <div className="experience-tag">
                  {
                    analysis.experienceLevel ||
                    "Intermediate"
                  }
                </div>

              </div>

              {/* MATCH SCORE */}

              <div className="analysis-section">

                <h3>Match Score</h3>

                <div className="skill-tags">

                  <span className="priority-chip">
                    ATS:
                    {" "}
                    {
                      analysis.atsScore || 0
                    }
                    %
                  </span>

                  <span className="priority-chip">
                    Match:
                    {" "}
                    {
                      analysis.matchScore || 0
                    }
                    %
                  </span>

                  <span className="priority-chip">
                    FAANG:
                    {" "}
                    {
                      analysis.faangReadiness ||
                      "Moderate"
                    }
                  </span>

                </div>

              </div>

              {/* MATCHED */}

              <div className="analysis-section">

                <h3>Matched Skills</h3>

                <div className="skill-tags">

                  {(analysis.matchedSkills || []).map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="skill-chip"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

              {/* MISSING */}

              <div className="analysis-section">

                <h3>Missing Skills</h3>

                <div className="skill-tags">

                  {(analysis.missingSkills || []).map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="priority-chip"
                      >
                        <Target size={12} />
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

              {/* TECH STACK */}

              <div className="analysis-section">

                <h3>Recommended Tech Stack</h3>

                <div className="tech-grid">

                  {/* FRONTEND */}

                  {analysis.techStack?.frontend?.length > 0 && (

                    <div className="tech-card neon-blue">

                      <div className="tech-icon">
                        <FaReact />
                      </div>

                      <div>

                        <h4>Frontend</h4>

                        <div className="skill-tags">

                          {analysis.techStack.frontend.map(
                            (item, index) => (

                              <span
                                key={index}
                                className="mini-chip"
                              >
                                {item}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                  {/* BACKEND */}

                  {analysis.techStack?.backend?.length > 0 && (

                    <div className="tech-card neon-pink">

                      <div className="tech-icon">
                        <FaNodeJs />
                      </div>

                      <div>

                        <h4>Backend</h4>

                        <div className="skill-tags">

                          {analysis.techStack.backend.map(
                            (item, index) => (

                              <span
                                key={index}
                                className="mini-chip"
                              >
                                {item}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                  {/* DATABASE */}

                  {analysis.techStack?.database?.length > 0 && (

                    <div className="tech-card neon-cyan">

                      <div className="tech-icon">
                        <FaDatabase />
                      </div>

                      <div>

                        <h4>Database</h4>

                        <div className="skill-tags">

                          {analysis.techStack.database.map(
                            (item, index) => (

                              <span
                                key={index}
                                className="mini-chip"
                              >
                                {item}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                  {/* AI */}

                  {analysis.techStack?.ai?.length > 0 && (

                    <div className="tech-card neon-purple">

                      <div className="tech-icon">
                        <FaBrain />
                      </div>

                      <div>

                        <h4>AI Stack</h4>

                        <div className="skill-tags">

                          {analysis.techStack.ai.map(
                            (item, index) => (

                              <span
                                key={index}
                                className="mini-chip"
                              >
                                {item}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* ROADMAP */}

              <div className="analysis-section">

                <h3>Preparation Strategy</h3>

                <div className="roadmap-list">

                  {(
                    analysis.recommendations ||
                    analysis.preparationStrategy ||
                    []
                  ).map(
                    (item, index) => (

                      <div
                        className="roadmap-item"
                        key={index}
                      >

                        <div className="roadmap-index">
                          {index + 1}
                        </div>

                        <p>{item}</p>

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default JDAnalyzer;