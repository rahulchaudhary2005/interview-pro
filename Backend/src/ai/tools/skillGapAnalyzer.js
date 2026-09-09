const IMPORTANT_SKILLS = [
  "react",
  "node",
  "mongodb",
  "system design",
  "dsa",
  "docker",
  "aws",
  "typescript",
  "langchain",
];

export const detectMissingSkills = (
  skills = [],
  jobDescription = ""
) => {

  const REQUIRED_SKILLS = [

    "react",
    "node",
    "express",
    "mongodb",
    "javascript",
    "typescript",
    "docker",
    "aws",
    "system design",
    "dsa",
    "python",
    "django",
    "ai",
    "machine learning",
    "langchain",
  ];

  const normalizedSkills =
    skills.map((s) =>
      s.toLowerCase()
    );

  const normalizedJD =
    jobDescription.toLowerCase();

  const missingSkills =
    REQUIRED_SKILLS.filter(
      (skill) => {

        const hasSkill =
          normalizedSkills.includes(
            skill
          );

        const jdNeedsSkill =
          normalizedJD.includes(
            skill
          );

        return (
          jdNeedsSkill &&
          !hasSkill
        );
      }
    );

  return missingSkills;
};