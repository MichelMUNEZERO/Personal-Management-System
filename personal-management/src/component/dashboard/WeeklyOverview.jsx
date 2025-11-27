const WeeklyOverview = ({ dailyHours, maxDailyHours }) => {
  return (
    <div className="card chart-card">
      <div className="card-header">
        <h2>📊 Weekly Overview</h2>
      </div>
      <div className="bar-chart">
        {Object.entries(dailyHours).map(([day, hours]) => (
          <div key={day} className="chart-bar-wrapper">
            <div className="chart-bar-container">
              <div
                className="chart-bar"
                style={{
                  height: `${(hours / maxDailyHours) * 100}%`,
                  background:
                    hours > 0
                      ? "linear-gradient(135deg, #f4a5b9, #e08a9f)"
                      : "#f0f0f0",
                }}
              >
                {hours > 0 && (
                  <span className="chart-value">{hours.toFixed(1)}h</span>
                )}
              </div>
            </div>
            <div className="chart-label">{day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyOverview;
