const StatsCard = ({ title, value, sub, children }) => {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <p>{title}</p>
      </div>

      <div className="stats-body">
        {children}
        <h2>{value}</h2>
        <span>{sub}</span>
      </div>
    </div>
  );
};

export default StatsCard;