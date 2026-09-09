import { useNavigate } from "react-router-dom";
import "../../../layout/layout.scss";

const FeaturePage = ({ title, subtitle, description, actionLabel, actionPath = '/', featureCards }) => {
  const navigate = useNavigate();

  const cards = featureCards || [
    { title: "Fast Insights", description: "Turn your resume or job description into actionable insights instantly." },
    { title: "AI Recommendations", description: "Receive tailored suggestions to improve your interview prep." },
    { title: "Practice Plan", description: "Build a focused plan with milestones and next steps." },
  ];

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">AI Feature</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="feature-hero-actions">
          <button className="btn btn-primary" onClick={() => navigate(actionPath)}>{actionLabel}</button>
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>View Reports</button>
        </div>
      </div>

      <div className="feature-grid">
        {cards.map((card, index) => (
          <div key={index} className="feature-card">
            <span className="feature-card-index">0{index + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <div className="feature-footer">
        <div className="feature-summary">
          <h3>{description}</h3>
          <p>Use this workspace to explore your preparation tools, refine your profile, and get ready for top interviews.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
