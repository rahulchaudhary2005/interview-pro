import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../../../features/interview/hooks/useInterview";
import useDashboard from "../services/hooks/useDashboard";
import "../components/dashboard.scss";

const samplePlans = [
  {
    id: 1,
    title: "Foundation",
    color: "pink",
    items: ["Core Concepts", "Data Structures", "ML Basics"],
    range: "Day 1-3",
    active: true,
  },
  {
    id: 2,
    title: "Advanced",
    color: "purple",
    items: ["System Design", "Deep Learning", "RAG & GenAI"],
    range: "Day 4-10",
    active: false,
  },
  {
    id: 3,
    title: "Practice",
    color: "blue",
    items: ["Mock Interviews", "Behavioral Prep", "Projects Review"],
    range: "Day 11-17",
    active: false,
  },
  {
    id: 4,
    title: "Mastery",
    color: "green",
    items: ["Company Prep", "Advanced Topics", "Final Revision"],
    range: "Day 18-21",
    active: false,
  },
];

const sampleSkills = [
  { name: "System Design", value: 60, color: "pink" },
  { name: "Cloud Architecture", value: 65, color: "blue" },
  { name: "MLOps", value: 70, color: "green" },
  { name: "Advanced Statistics", value: 55, color: "orange" },
];

const sampleFeedback = [
  { type: "Technical", value: "85/100", color: "green", text: "Explain the difference between CNN and Transformer." },
  { type: "Behavioral", value: "72/100", color: "gold", text: "How do you handle a conflict in a team?" },
  { type: "System Design", value: "88/100", color: "green", text: "Design a system for real-time chat application." },
];

const Dashboard = () => {
  const { reports, loading, getReports } = useInterview();
  const { stats, loading: dashboardLoading, error } = useDashboard();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("roadmap");

  useEffect(() => {
    getReports();
  }, [getReports]);

  const planData = reports && reports.length ? reports.slice(0, 4) : samplePlans;
  const matchScore = stats?.matchScore ?? 88;
  const skillsCovered = stats?.skillsCovered ?? 24;
  const totalSkills = stats?.totalSkills ?? 32;
  const totalInterviews = stats?.totalInterviews ?? reports?.length ?? 12;
  const averageScore = stats?.avgScore ?? 78;
  const streak = stats?.streak ?? 7;

  const handleStartVoiceInterview = () => navigate("/mock-interview");
  const handleOpenFeedback = () => navigate("/ai-feedback");
  const handleOpenResumeAnalyzer = () => navigate("/resume-analyzer");
  const handleOpenRoadmap = () => navigate("/roadmap-generator");
  const handleOpenHelp = () => navigate("/help-support");

  const timelineItems = [
    { label: "Foundation", range: "Day 1-3" },
    { label: "Advanced", range: "Day 4-10" },
    { label: "Practice", range: "Day 11-17" },
    { label: "Mastery", range: "Day 18-21" }
  ];

  if (loading || dashboardLoading) return <div className="dashboard-loading">Loading your dashboard...</div>;

  return (
    <div className="dashboard-page">
      {error && <div className="dashboard-error">{error}</div>}
      <div className="dashboard-shell">
        <section className="stats-grid">
          <div className="stat-card highlight-card">
            <div className="stat-card__label">Overall Match Score</div>
            <div className="stat-card__body stat-card__body--score">
              <div className="score-ring">
                <span>{matchScore}%</span>
              </div>
              <div className="score-caption">{matchScore >= 80 ? "Strong Match" : "Growing Fast"}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__label">Skills Covered</div>
            <div className="stat-card__metric">{skillsCovered}/{totalSkills}</div>
            <div className="mini-progress mini-progress--purple">
              <span style={{ width: `${(skillsCovered / totalSkills) * 100}%` }} />
            </div>
            <div className="stat-card__meta">{Math.round((skillsCovered / totalSkills) * 100)}%</div>
          </div>

          <div className="stat-card">
            <div className="stat-card__label">Mock Interviews</div>
            <div className="stat-card__metric">{totalInterviews}</div>
            <div className="stat-card__meta muted">Completed</div>
          </div>

          <div className="stat-card">
            <div className="stat-card__label">Avg. Answer Score</div>
            <div className="stat-card__metric">{averageScore}/100</div>
            <div className="stat-card__meta green">{averageScore >= 75 ? "Good" : "Improve"}</div>
          </div>

          <div className="stat-card">
            <div className="stat-card__label">Study Streak</div>
            <div className="stat-card__metric">{streak} Days</div>
            <div className="stat-card__meta muted">Keep it up!</div>
          </div>
        </section>

        <section className="dashboard-main-layout">
          <div className="main-column">
            <div className="section-header">
              <div>
                <h2>Your AI Interview Plan</h2>
                <p>Personalized roadmap created by AI agents</p>
              </div>
              <div className="header-toggle-group">
                <button
                  className={`toggle-btn ${viewMode === "roadmap" ? "active" : ""}`}
                  onClick={() => setViewMode("roadmap")}
                >
                  Roadmap View
                </button>
                <button
                  className={`toggle-btn ${viewMode === "timeline" ? "active" : ""}`}
                  onClick={() => setViewMode("timeline")}
                >
                  Timeline View
                </button>
              </div>
            </div>

            {viewMode === "roadmap" ? (
              <div className="plan-grid">
                {planData.map((plan, index) => (
                  <div
                    key={plan.id || index}
                    className={`plan-card plan-card--${plan.color || "purple"} ${plan.active ? "active" : ""}`}
                  >
                    <div className="plan-card__header">
                      <span className="plan-number">0{index + 1}</span>
                      <span className="plan-title">{plan.title}</span>
                    </div>

                    <ul className="plan-list">
                      {(plan.items || plan.topics || []).map((item, itemIndex) => (
                        <li key={`${plan.id || index}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>

                    <div className="plan-footer">
                      <span>{plan.range || "Day 1-3"}</span>
                      {plan.active && <span className="status-check">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="plan-grid timeline-grid">
                {timelineItems.map((item, index) => (
                  <div key={item.label} className={`plan-card plan-card--purple ${index === 0 ? "active" : ""}`}>
                    <div className="plan-card__header">
                      <span className="plan-number">0{index + 1}</span>
                      <span className="plan-title">{item.label}</span>
                    </div>
                    <ul className="plan-list">
                      <li>Goal: focus on {item.label.toLowerCase()} skills</li>
                      <li>Practice exercises for this stage</li>
                      <li>Review and knowledge reinforcement</li>
                    </ul>
                    <div className="plan-footer">
                      <span>{item.range}</span>
                      {index === 0 && <span className="status-check">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="lower-grid">
              <div className="card panel interview-panel">
                <div className="card-header">
                  <h3>AI Mock Interview</h3>
                  <span className="beta-tag">Beta</span>
                </div>
                <div className="interview-panel__body">
                  <div className="voice-circle">
                    <div className="voice-wave" />
                  </div>
                  <button className="primary-panel-btn" onClick={handleStartVoiceInterview}>Start Voice Interview</button>
                  <div className="segmented-btns">
                    <button className="segment active" type="button">Voice</button>
                    <button className="segment" type="button" onClick={handleStartVoiceInterview}>Text</button>
                  </div>
                </div>
              </div>

              <div className="card panel feedback-panel">
                <div className="card-header">
                  <h3>Recent AI Feedback</h3>
                  <button className="text-btn" type="button" onClick={handleOpenFeedback}>View All</button>
                </div>

                <div className="feedback-list">
                  {sampleFeedback.map((item, index) => (
                    <div key={index} className="feedback-item">
                      <div className={`feedback-icon ${item.color}`}>
                        {item.type[0]}
                      </div>
                      <div className="feedback-content">
                        <div className="feedback-header-row">
                          <span>{item.type}</span>
                          <span className="score-pill">{item.value}</span>
                        </div>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="skills-panel card">
              <div className="card-header">
                <h3>Top Skills to Improve</h3>
                <button className="text-btn" type="button" onClick={handleOpenRoadmap}>View All Skills</button>
              </div>

              <div className="skill-grid">
                {sampleSkills.map((skill) => (
                  <div key={skill.name} className="skill-box">
                    <div className="skill-box__top">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="mini-progress mini-progress--accent mini-progress--purple">
                      <span className={`fill-${skill.color}`} style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="side-column">
            <div className="card side-card resume-card">
              <div className="card-header compact-header">
                <h3>Resume Analysis</h3>
                <span className="mini-score">ATS Score</span>
              </div>

              <div className="resume-ring-wrap">
                <div className="resume-ring">
                  <span>82/100</span>
                </div>
              </div>

              <button className="secondary-cta" type="button" onClick={handleOpenResumeAnalyzer}>Improve Resume →</button>
            </div>

            <div className="card side-card gap-card">
              <div className="card-header compact-header">
                <h3>Skill Gap Analysis</h3>
              </div>

              <div className="gap-list">
                {sampleSkills.map((skill) => (
                  <div key={`gap-${skill.name}`} className="gap-item">
                    <div className="gap-label-row">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="mini-progress mini-progress--light">
                      <span className={`fill-${skill.color}`} style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="secondary-cta secondary-cta--small" type="button" onClick={handleOpenRoadmap}>View Full Analysis →</button>
            </div>

            <div className="card side-card activity-card">
              <div className="card-header compact-header">
                <h3>Recent Activity</h3>
              </div>

              <ul className="activity-list">
                <li><span className="activity-icon">◉</span> Mock Interview completed <small>2 hours ago</small></li>
                <li><span className="activity-icon">◉</span> Resume Analyzed <small>5 hours ago</small></li>
                <li><span className="activity-icon">◉</span> New Plan Generated <small>1 day ago</small></li>
                <li><span className="activity-icon">◉</span> Feedback Received <small>2 days ago</small></li>
              </ul>

              <button className="secondary-cta secondary-cta--small" type="button" onClick={handleOpenHelp}>View All Activity</button>
            </div>
          </aside>
        </section>

        <div className="promo-banner">
          <div className="promo-banner__text">
            <span className="promo-badge">AI</span>
            <span>AI-Powered with Multi-Agent System</span>
          </div>
          <button className="promo-btn" type="button" onClick={handleOpenHelp}>Learn How It Works</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;