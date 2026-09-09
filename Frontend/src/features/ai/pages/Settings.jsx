import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">Settings</div>
        <h1>Account & Experience Settings</h1>
        <p>Adjust your preferences, privacy, and notification settings in one place.</p>
        <div className="feature-hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>Open Profile Settings</button>
          <button className="btn btn-secondary" onClick={() => navigate('/help-support')}>Need Help?</button>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-card-index">01</span>
          <h3>Account Control</h3>
          <p>Manage your login, username, and security preferences safely.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">02</span>
          <h3>Preferences</h3>
          <p>Choose theme, notifications, and user experience options.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card-index">03</span>
          <h3>Data Privacy</h3>
          <p>Review data usage, consent settings, and app storage rules.</p>
        </div>
      </div>

      <div className="feature-footer">
        <div className="feature-summary">
          <h3>Customize your workspace</h3>
          <p>Fine-tune the app behavior to match the way you prepare for interviews.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
