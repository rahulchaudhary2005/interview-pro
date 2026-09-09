import { useState } from "react";

import "../../../layout/layout.scss";
import "./resumeAnalyzer.scss";
import { generateInterviewReportAPI } from "../services/ai.api";

const ResumeAnalyzer = () => {

  const [jobDescription, setJobDescription] =
    useState("");

  const [resumeFile, setResumeFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");



  /* =====================================================
     HANDLE SUBMIT
  ===================================================== */

  const handleAnalyzeResume =
    async () => {

      try {

        setLoading(true);

        setError("");

        const formData =
          new FormData();

        formData.append(
          "jobDescription",
          jobDescription
        );

        if (resumeFile) {
          formData.append(
            "resume",
            resumeFile
          );
        }

        const response =
          await generateInterviewReportAPI(formData);

        setResult(
          response.interviewReport
        );
        console.log(
            "FULL RESPONSE:",
           response
          );

console.log(
  "INTERVIEW REPORT:",
  response.interviewReport
);

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data
            ?.message ||
            "Resume analysis failed"
        );

      } finally {

        setLoading(false);

      }
    };



  return (

    <div className="feature-page">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <div className="feature-hero">

        <div className="feature-hero-badge">
          AI Resume Analyzer
        </div>

        <h1>
          ATS + FAANG Resume Intelligence
        </h1>

        <p>
          Upload your resume and let AI
          analyze your ATS score,
          missing skills, FAANG readiness,
          strengths, weaknesses, and
          interview preparation level.
        </p>

      </div>



      {/* =========================================
          INPUT SECTION
      ========================================= */}

      <div className="feature-grid">

        {/* JOB DESCRIPTION */}

        <div className="feature-card">

          <h3>
            Target Job Description
          </h3>

          <textarea
            className="search-input"
            rows={12}
            placeholder="Paste job description..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
          />

        </div>



        {/* RESUME UPLOAD */}

        <div className="feature-card">

          <h3>
            Upload Resume
          </h3>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setResumeFile(
                e.target.files[0]
              )
            }
          />

          <button
            className="btn btn-primary"
            onClick={
              handleAnalyzeResume
            }
            disabled={loading}
            style={{
              marginTop: "20px",
            }}
          >

            {loading
              ? "Analyzing..."
              : "Analyze Resume"}

          </button>

        </div>

      </div>



      {/* =========================================
          ERROR
      ========================================= */}

      {error && (

        <div className="feature-footer">

          <p className="error-text">
            {error}
          </p>

        </div>

      )}



      {/* =========================================
          RESULTS
      ========================================= */}

      {result && (

        <div className="feature-footer">

          {/* ATS SCORE */}

      <div className="feature-summary score-card">

      <div className="score-header">

     <div>

      <h2>
        ATS Score
      </h2>

      <p className="score-subtitle">
        Resume ATS Optimization
      </p>

    </div>

    <div className="score-circle">

      {result.atsScore ||
        result.matchScore ||
        0}
      %

    </div>

  </div>

  <div className="progress-container">

    <div
      className="progress-fill"
      style={{
        width: `${
          result.atsScore ||
          result.matchScore ||
          0
        }%`,
      }}
    />

  </div>

  <div className="score-footer">

    <span>
      ATS Compatibility
    </span>

    <span>
      {
        result.atsScore >= 80
          ? "Excellent"
          : result.atsScore >= 60
          ? "Good"
          : "Needs Work"
      }
    </span>

  </div>

      </div>



          {/* FAANG READINESS */}

<div className="feature-summary score-card">

  <div className="score-header">

    <div>

      <h2>
        FAANG Readiness
      </h2>

      <p className="score-subtitle">
        AI Hiring Readiness
      </p>

    </div>

    <div className="score-circle secondary">

      {
        result.faangReadiness || 0
      }
      %

    </div>

  </div>

  <div className="progress-container">

    <div
      className="progress-fill secondary-fill"
      style={{
        width: `${
          result.faangReadiness || 0
        }%`,
      }}
    />

  </div>

  <div className="score-footer">

    <span>
      Interview Level
    </span>

    <span>
      {
        result.interviewReadiness ||
        "Needs Improvement"
      }
    </span>

  </div>

</div>



          {/* SKILLS */}

          <div className="feature-summary">

            <h3>
              Extracted Skills
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >

              {result.extractedSkills?.map(
                (skill, index) => (

                  <div
                    key={index}
                    className="feature-hero-badge"
                  >
                    {skill}
                  </div>

                )
              )}

            </div>

          </div>



          {/* MISSING SKILLS */}

          <div className="feature-summary">

            <h3>
              Missing Skills
            </h3>

            <ul>

              {result.missingSkills?.map(
                (skill, index) => (

                  <li key={index}>
                    {skill}
                  </li>

                )
              )}

            </ul>

          </div>



          {/* STRENGTHS */}

          <div className="feature-summary">

            <h3>
              Strengths
            </h3>

            <ul>

              {result.strengths?.map(
                (
                  strength,
                  index
                ) => (

                  <li key={index}>
                    {strength}
                  </li>

                )
              )}

            </ul>

          </div>



          {/* WEAKNESSES */}

          <div className="feature-summary">

            <h3>
              Weaknesses
            </h3>

            <ul>

              {result.weaknesses?.map(
                (
                  weakness,
                  index
                ) => (

                  <li key={index}>
                    {weakness}
                  </li>

                )
              )}

            </ul>

          </div>



          {/* RECOMMENDATIONS */}

          <div className="feature-summary">

            <h3>
              Recommendations
            </h3>

            <ul>

              {result.recommendations?.map(
                (
                  recommendation,
                  index
                ) => (

                  <li key={index}>
                    {
                      recommendation
                    }
                  </li>

                )
              )}

            </ul>

          </div>



          {/* PROJECTS */}

          <div className="feature-summary">

            <h3>
              Suggested Projects
            </h3>

            <ul>

              {result.suggestedProjects?.map(
                (
                  project,
                  index
                ) => (

                  <li key={index}>
                    {project}
                  </li>

                )
              )}

            </ul>

          </div>



          {/* CAREER SUGGESTIONS */}

          <div className="feature-summary">

            <h3>
              Career Suggestions
            </h3>

            <ul>

              {result.careerSuggestions?.map(
                (
                  career,
                  index
                ) => (

                  <li key={index}>
                    {career}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      )}

    </div>
  );
};

export default ResumeAnalyzer;
