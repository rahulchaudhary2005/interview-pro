export const calculateFAANGReadiness = (
  atsScore = 0,
  extractedSkills = []
) => {

  let score = 0;

  /* ========================================
     ATS CONTRIBUTION
  ======================================== */

  score += atsScore * 0.45;

  /* ========================================
     SKILL CONTRIBUTION
  ======================================== */

  const IMPORTANT_SKILLS = [

    "react",
    "node",
    "mongodb",
    "typescript",
    "system design",
    "dsa",
    "docker",
    "aws",
    "langchain",
    "machine learning",
    "python",
  ];

    const normalizedSkills =
    extractedSkills.map(
      (s) => s.toLowerCase()
    );

  const matchedSkills =
    IMPORTANT_SKILLS.filter(
      (skill) =>
        normalizedSkills.includes(
          skill
        )
    );

  const skillScore =
    (matchedSkills.length /
      IMPORTANT_SKILLS.length) *
    55;

  score += skillScore;

  /* ========================================
     FINAL SCORE
  ======================================== */

  score = Math.min(
    100,
    Math.round(score)
  );

  console.log(
    "FAANG READINESS SCORE:",
    score
  );

  return score;
};