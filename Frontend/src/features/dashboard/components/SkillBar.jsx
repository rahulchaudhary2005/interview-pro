const SkillBar = ({ name, percent }) => {
  return (
    <div className="skill-bar">
      <div className="skill-top">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="bar">
        <div className="fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default SkillBar;