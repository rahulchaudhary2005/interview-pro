import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import "./layout.scss";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "New Interview Plan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
      description: "Create personalized interview strategy"
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      description: "View all your interview plans"
    }
  ];

  const featureItems = [
    { path: "/resume-analyzer", name: "Resume Analyzer", icon: "📄", status: "active" },
    { path: "/jd-analyzer", name: "JD Analyzer", icon: "🎯", status: "active" },
    { path: "/question-generator", name: "Question Generator", icon: "❓", status: "active" },
    { path: "/roadmap-generator", name: "Roadmap Generator", icon: "🗺️", status: "active" },
    { path: "/mock-interview", name: "Mock Interviews", icon: "🎭", status: "active" },
    { path: "/ai-feedback", name: "AI Feedback", icon: "🤖", status: "active" },
    { path: "/rag-explorer", name: "RAG Explorer", icon: "📚", status: "active" },
    { path: "/query-interface", name: "Query AI", icon: "💬", status: "active" }
  ];

  const recentActivity = [
    { action: "Generated interview plan", target: "React Developer", time: "2 min ago" },
    { action: "Analyzed resume", target: "John's CV", time: "1 hour ago" },
    { action: "Completed mock interview", target: "Frontend Round", time: "3 hours ago" },
  ];

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="logo-text">
              InterviewAI <span>Pro</span>
            </div>
          </div>
          <div className="logo-subtitle">AI-Powered Interview Preparation</div>
        </div>

        {/* User Profile Section */}
        {user && (
          <div className="user-profile">
            <div className="user-avatar">
              <span>{user.username?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">Navigation</h3>
          <div className="menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? 'active' : ''} ${location.pathname === item.path ? 'current' : ''}`
                }
              >
                <div className="menu-icon">{item.icon}</div>
                <div className="menu-content">
                  <div className="menu-label">{item.label}</div>
                  <div className="menu-description">{item.description}</div>
                </div>
                {location.pathname === item.path && (
                  <div className="menu-indicator">
                    <div className="indicator-dot"></div>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="nav-section">
          <h3 className="nav-title">Your Progress</h3>
          <div className="progress-section">
            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Interview Plans</span>
                <span className="progress-value">12/20</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Mock Interviews</span>
                <span className="progress-value">8/15</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '53%' }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Skill Assessment</span>
                <span className="progress-value">85%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="nav-section">
          <h3 className="nav-title">Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-target">{activity.target}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3 className="features-title">AI Features</h3>
          <div className="features-list">
            {featureItems.map((feature, index) => (
              feature.disabled ? (
                <div key={index} className={`feature-item ${feature.status} disabled`}>
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-name">{feature.name}</div>
                  <div className="feature-badge">Soon</div>
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={feature.path}
                  className={({ isActive }) => `feature-item ${feature.status} ${isActive ? 'active' : ''}`}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-name">{feature.name}</div>
                </NavLink>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <div className="sidebar-info">
          <div className="info-item">
            <div className="info-icon">⚡</div>
            <div className="info-text">Powered by Gemini AI</div>
          </div>
          <div className="info-item">
            <div className="info-icon">🔒</div>
            <div className="info-text">Secure & Private</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;