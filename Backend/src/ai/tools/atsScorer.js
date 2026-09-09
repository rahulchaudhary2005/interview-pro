export const calculateATSScore = (
  resumeSkills,
  jobDescription
) => {

  const jd =
    jobDescription.toLowerCase();

  let score = 0;

  resumeSkills.forEach(
    (skill) => {
      if (
        jd.includes(
          skill.toLowerCase()
        )
      ) {
        score += 10;
      }
    }
  );

  if (score > 100)
    score = 100;

  return score;
};