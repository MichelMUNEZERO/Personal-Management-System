const WeeklyPerformance = ({ dailyHours }) => {
  return (
    <div className="card performance-card">
      <div className="card-header">
        <h2>📈 Weekly Performance</h2>
      </div>
      <div className="performance-list">
        {Object.entries(dailyHours).map(([day, hours]) => {
          const percentage = Math.min(100, (hours / 8) * 100);
          return (
            <div key={day} className="performance-item">
              <span className="perf-day">{day}:</span>
              <div className="perf-bar">
                <div
                  className="perf-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="perf-value">{Math.round(percentage)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyPerformance;
