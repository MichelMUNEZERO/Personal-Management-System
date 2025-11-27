const GoalsProgress = ({ goals, categoryColors, categoryEmojis }) => {
  return (
    <div className="card goals-card">
      <div className="card-header">
        <h2>🎯 Daily Goals Progress</h2>
      </div>
      <div className="goals-list">
        {Object.entries(goals).map(([category, goal]) => (
          <div key={category} className="goal-item">
            <div className="goal-header">
              <span className="goal-emoji">{categoryEmojis[category]}</span>
              <span className="goal-name">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <span className="goal-progress-text">
                ({goal.achieved}/{goal.target}h)
              </span>
              <span className="goal-percentage">
                {Math.round(goal.percentage)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${goal.percentage}%`,
                  background: categoryColors[category],
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsProgress;
