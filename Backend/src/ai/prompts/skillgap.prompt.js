export const SKILL_GAP_PROMPT = `
You are an advanced AI Resume vs Job Description analyzer.

Compare the candidate resume with the target job description.

Return response in JSON format.

Required JSON format:

{
  "matchScore": 0,
  "atsScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "strongAreas": [],
  "weakAreas": [],
  "priorityImprovements": [],
  "interviewReadiness": "",
  "faangReadiness": "",
  "recommendations": [],
  "learningRoadmap": []
}

Resume:
`;

export const JOB_DESCRIPTION_SEPARATOR = `
Target Job Description:
`;