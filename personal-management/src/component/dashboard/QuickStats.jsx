const QuickStats = ({ stats }) => {
  const statItems = [
    {
      icon: "✅",
      value: stats.todayCompleted,
      label: "Activities Completed",
    },
    {
      icon: "⏱️",
      value: `${stats.todayTimeTracked}h`,
      label: "Time Tracked",
    },
    {
      icon: "🎯",
      value: `${stats.goalsAchieved}/${stats.totalGoals}`,
      label: "Goals Achieved",
    },
    {
      icon: "📈",
      value: `${stats.productivityScore}%`,
      label: "Productivity",
    },
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item) => (
        <div key={item.label} className="stat-card">
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
