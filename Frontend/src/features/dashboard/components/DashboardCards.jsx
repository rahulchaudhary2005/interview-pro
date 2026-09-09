import StatsCard from "./StatsCard";
import CircularProgress from "./CircularProgress";
import SkillBar from "./SkillBar";
import ActivityPanel from "./ActivityPanel";

const DashboardCards = ({ stats }) => {
  return (
    <div className="dashboard">
      <div className="top-cards">
        <StatsCard title="Overall Match Score">
          <CircularProgress value={stats.matchScore} />
        </StatsCard>

        <StatsCard
          title="Skills Covered"
          value={`${stats.skillsCovered}/32`}
          sub="75%"
        />

        <StatsCard
          title="Mock Interviews"
          value={stats.totalInterviews}
          sub="Completed"
        />

        <StatsCard
          title="Avg Score"
          value={`${stats.avgScore}/100`}
          sub="Good"
        />

        <StatsCard
          title="Study Streak"
          value={`${stats.streak} Days`}
          sub="Keep it up!"
        />
      </div>

      <div className="bottom-section">
        <div className="skills">
          <h3>Skill Gap Analysis</h3>
          <SkillBar name="System Design" percent={30} />
          <SkillBar name="MLOps" percent={40} />
          <SkillBar name="Advanced Math" percent={35} />
          <SkillBar name="Cloud (AWS)" percent={25} />
        </div>

        <ActivityPanel />
      </div>
    </div>
  );
};

export default DashboardCards;