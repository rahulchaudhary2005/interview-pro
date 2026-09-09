const CircularProgress = ({ value }) => {
  return (
    <div className="circle">
      <svg>
        <circle cx="40" cy="40" r="35" />
        <circle
          cx="40"
          cy="40"
          r="35"
          style={{
            strokeDashoffset: 220 - (220 * value) / 100,
          }}
        />
      </svg>
      <div className="circle-text">{value}%</div>
    </div>
  );
};

export default CircularProgress;