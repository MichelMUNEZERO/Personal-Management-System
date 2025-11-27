const InsightsPanel = ({ weekActivities }) => {
  const insights = [
    { icon: "📊", text: "Your most productive time is 10AM-12PM" },
    { icon: "✅", text: "You're on track to hit your work goal" },
    {
      icon: "💪",
      text: `Exercise consistency: ${weekActivities} activities this week`,
    },
    { icon: "🎯", text: "Keep up the great tracking habit!" },
  ];

  return (
    <div className="card insights-card">
      <div className="card-header">
        <h2>💡 Today's Insights</h2>
      </div>
      <div className="insights-list">
        {insights.map((insight) => (
          <div key={insight.text} className="insight-item">
            <span className="insight-icon">{insight.icon}</span>
            <p>{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
