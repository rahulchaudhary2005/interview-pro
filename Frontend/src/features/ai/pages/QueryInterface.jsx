import { useState } from "react";
import { useLLMQuery } from "../hooks/useLLMQuery";
import "../../../layout/layout.scss";

const QueryInterface = () => {
  const [query, setQuery] = useState("");
  const [queryHistory, setQueryHistory] = useState([]);
  const { loading, result, error, queryLLM } = useLLMQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const response = await queryLLM(query);
    if (response) {
      setQueryHistory([
        ...queryHistory,
        {
          query,
          answer: response.answer,
          sources: response.sources,
          timestamp: new Date(),
        },
      ]);
      setQuery("");
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-hero">
        <div className="feature-hero-badge">LLM Query Interface</div>
        <h1>AI-Powered Interview Q&A</h1>
        <p>Ask questions about interview prep and get accurate answers powered by LangChain, LangGraph, and HuggingFace.</p>
        <form className="feature-hero-actions" onSubmit={handleSubmit}>
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about interview tips, resume optimization, or job analysis..."
            disabled={loading}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </form>
      </div>

      {error && (
        <div className="feature-footer" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
          <p style={{ color: "#fca5a5" }}>Error: {error}</p>
        </div>
      )}

      {result && (
        <div className="feature-footer">
          <div className="feature-summary">
            <h3>Latest Response</h3>
            <p>{result.answer}</p>
            {result.sources > 0 && (
              <p style={{ marginTop: "12px", fontSize: "0.9rem", color: "#94a3b8" }}>
                📚 Found in {result.sources} interview report(s)
              </p>
            )}
          </div>
        </div>
      )}

      {queryHistory.length > 0 && (
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Query History</h3>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {queryHistory.map((item, index) => (
                <div key={index} style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(71, 85, 105, 0.3)" }}>
                  <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                    {item.timestamp.toLocaleTimeString()}
                  </p>
                  <p style={{ fontWeight: "600", marginBottom: "8px" }}>Q: {item.query}</p>
                  <p style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>A: {item.answer.substring(0, 150)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h3>How It Works</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>🔍</span>
                <strong>Query Analysis</strong> - Your question is processed by LangChain
              </li>
              <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>🧠</span>
                <strong>LLM Processing</strong> - Google Gemini & HuggingFace models provide answers
              </li>
              <li style={{ marginBottom: "12px", paddingLeft: "20px", position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>📚</span>
                <strong>RAG Integration</strong> - Context from your saved reports enriches responses
              </li>
              <li style={{ paddingLeft: "20px", position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>✅</span>
                <strong>Accurate Results</strong> - Get interview-ready insights instantly
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <h3>Example Questions</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>• How do I prepare for system design interviews?</li>
              <li style={{ marginBottom: "10px" }}>• What are common behavioral questions for tech roles?</li>
              <li style={{ marginBottom: "10px" }}>• How should I tailor my resume for this role?</li>
              <li>• What skills should I focus on improving?</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryInterface;
