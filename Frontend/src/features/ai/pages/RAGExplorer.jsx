import { useState } from "react";
import { useAIAgent } from "../hooks/useAIAgent";
import "../../../layout/layout.scss";

const RAGExplorer = () => {
  const [query, setQuery] = useState("");
  const { loading, result, error, executeQuery } = useAIAgent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await executeQuery(query);
  };

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">RAG Explorer</div>
        <h1>Retrieval-Augmented Generation</h1>
        <p>Ask questions about your saved interview reports and get answers based on the most relevant content.</p>
        <form className="feature-hero-actions" onSubmit={handleSubmit}>
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask the AI agent about your interview prep..."
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Searching..." : "Run Query"}
          </button>
        </form>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>How it works</h3>
          <p>
            The agent pulls relevant details from your saved interview reports, then generates a concise answer using those findings.
          </p>
        </div>
        <div className="feature-card">
          <h3>Built-in retrieval</h3>
          <p>
            It searches your titles, job descriptions, resume text, and self-description for the best match.
          </p>
        </div>
        <div className="feature-card">
          <h3>Fast follow-up</h3>
          <p>
            Refine questions and get updated answers quickly without leaving the dashboard.
          </p>
        </div>
      </div>

      {error && <div className="feature-footer"><p className="error-text">{error}</p></div>}

      {result && (
        <div className="feature-footer">
          <div className="feature-summary">
            <h3>Answer</h3>
            <p>{result.answer}</p>
            {result.sources?.length > 0 && (
              <div>
                <h4>Sources</h4>
                <ul>
                  {result.sources.map((source, index) => (
                    <li key={index}>
                      <strong>{source.title}</strong> — {source.hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RAGExplorer;
