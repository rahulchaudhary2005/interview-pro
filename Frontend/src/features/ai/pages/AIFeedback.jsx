const AIFeedback = () => {
  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">AI Feedback</div>
        <h1>AI Feedback</h1>
        <p>Receive intelligent feedback on your answers, resume points, and interview readiness.</p>
        <div className="feature-hero-actions">
          <button className="btn btn-primary">Request Feedback</button>
          <button className="btn btn-secondary">Review Past Feedback</button>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-card-index">01</span>
          <h3>Answer Refinement</h3>
          <p>Strengthen your responses with AI suggestions for clarity and impact.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">02</span>
          <h3>Resume Suggestions</h3>
          <p>Optimize your resume content for stronger technical and leadership narratives.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">03</span>
          <h3>Follow-up Tips</h3>
          <p>Get guidance on next steps after an interview or assessment session.</p>
        </div>
      </div>

      <div className="feature-footer">
        <div className="feature-summary">
          <h3>Make every interview count.</h3>
          <p>Use AI-powered review to iterate quickly on your preparation and presentation.</p>
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;
