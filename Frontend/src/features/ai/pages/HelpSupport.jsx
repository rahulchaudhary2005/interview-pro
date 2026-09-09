import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">Help & Support</div>
        <h1>Help & Support</h1>
        <p>Get answers, troubleshooting tips, and support resources for InterviewAI Pro.</p>
        <div className="feature-hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>View Help Articles</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-card-index">01</span>
          <h3>FAQ and Troubleshooting</h3>
          <p>Find the most common solutions quickly and keep your workflow moving.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">02</span>
          <h3>Feedback & Requests</h3>
          <p>Share issues, suggestions, or new feature ideas directly from the app.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">03</span>
          <h3>Contact Support</h3>
          <p>Reach out for help with your account or technical questions.</p>
        </div>
      </div>

      <div className="feature-footer">
        <div className="feature-summary">
          <h3>We’re here to help</h3>
          <p>Use this page to solve issues faster and get the most from your prep experience.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
