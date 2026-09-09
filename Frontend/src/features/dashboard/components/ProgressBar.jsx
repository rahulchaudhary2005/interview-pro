const ProgressBar = ({ value, label }) => {
  return (
    <div className="progress-bar">
      <label>{label}</label>
      <div className="bar">
        <div 
          className="fill" 
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="percentage">{value}%</span>
    </div>
  );
};

export default ProgressBar;
