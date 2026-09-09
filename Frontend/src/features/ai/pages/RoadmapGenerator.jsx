import { useNavigate } from "react-router-dom";

const RoadmapGenerator = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">Roadmap Generator</div>
        <h1>Preparation Roadmap</h1>
        <p>Build a clear study plan to reach interview readiness faster.</p>
        <div className="feature-hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>Build Roadmap</button>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>View Past Plans</button>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-card-index">01</span>
          <h3>Skill Path</h3>
          <p>Map out the skills to develop and the order to master them.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">02</span>
          <h3>Timeline Planner</h3>
          <p>Turn your preparation into a manageable week-by-week plan.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">03</span>
          <h3>Focus Areas</h3>
          <p>Identify the topics that will make the biggest impact on your readiness.</p>
        </div>
      </div>

      <div className="feature-footer">
        <div className="feature-summary">
          <h3>Plan with confidence</h3>
          <p>Create a strategy that balances research, practice, and refinement.</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
