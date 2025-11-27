const actions = [
  { icon: "➕", label: "Log New Activity" },
  { icon: "⏱️", label: "Start Timer" },
  { icon: "🎯", label: "Set Daily Goal" },
  { icon: "📊", label: "View Weekly Report" },
  { icon: "⚙️", label: "Settings" },
];

const QuickActions = () => {
  return (
    <div className="card actions-card">
      <div className="card-header">
        <h2>⚡ Quick Actions</h2>
      </div>
      <div className="actions-grid">
        {actions.map((action) => (
          <button key={action.label} className="action-btn">
            <span className="action-icon">{action.icon}</span>
            <span className="action-text">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
