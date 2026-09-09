// backend/src/services/stats.service.js

import User from "../models/user.model.js";
import Interview from "../models/interviewReport.model.js";

/**
 * Simple similarity function (you can upgrade later with embeddings)
 */
const calculateMatchScore = (userSkills, jdSkills) => {
  if (!userSkills || !jdSkills) return 0;

  const matched = userSkills.filter((skill) =>
    jdSkills.includes(skill)
  );

  return Math.round((matched.length / jdSkills.length) * 100);
};

export const getDashboardStats = async (userId) => {
  // 1. Fetch user
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  // 2. Fetch interviews
  const interviews = await Interview.find({ user: userId });

  // -----------------------------
  // 3. Calculate Avg Score
  // -----------------------------
  const avgScore =
    interviews.length > 0
      ? Math.round(
          interviews.reduce((acc, i) => acc + (i.matchScore || 0), 0) /
            interviews.length
        )
      : 0;

  // -----------------------------
  // 4. Skills Covered
  // -----------------------------
  const userSkills = user.skills || [];
  const jdSkills = user.jdSkills || []; // assume stored

  const matchedSkills = userSkills.filter((skill) =>
    jdSkills.includes(skill)
  );

  const skillsCovered = matchedSkills.length;
  const totalSkills = jdSkills.length || 1;

  // -----------------------------
  // 5. Match Score
  // -----------------------------
  const matchScore = calculateMatchScore(userSkills, jdSkills);

  // -----------------------------
  // 6. Streak (basic logic)
  // -----------------------------
  const streak = user.stats?.streak || 0;

  // -----------------------------
  // 7. Total Interviews
  // -----------------------------
  const totalInterviews = interviews.length;

  return {
    matchScore,
    skillsCovered,
    totalSkills,
    avgScore,
    totalInterviews,
    streak,
  };
};
