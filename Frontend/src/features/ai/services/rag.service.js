import { fetchInterviewReportsAPI } from "./ai.api";

const computeTextScore = (text, query) => {
  const normalized = text.toLowerCase();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.reduce((score, term) => score + (normalized.includes(term) ? 1 : 0), 0);
};

export const retrieveRelevantReportFragments = async (query) => {
  const { interviewReports } = await fetchInterviewReportsAPI();
  const matches = interviewReports
    .map((report) => {
      const segments = [
        report.title,
        report.jobDescription,
        report.selfDescription,
        report.resume,
      ];
      return {
        ...report,
        score: segments.reduce((total, fragment) => total + computeTextScore(fragment || "", query), 0),
      };
    })
    .filter((report) => report.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return matches;
};

export const buildRAGResponse = async (query) => {
  const hits = await retrieveRelevantReportFragments(query);
  const snippets = hits.map((hit) => ({ title: hit.title, score: hit.score, hint: hit.jobDescription.slice(0, 125) }));

  return {
    query,
    hits: snippets,
    response:
      hits.length > 0
        ? `I found ${hits.length} relevant report(s). Use the first match to guide interview prep and resume alignment.`
        : "No matching reports found yet. Upload a resume or generate a report to get started.",
  };
};
