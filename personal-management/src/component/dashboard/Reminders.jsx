const reminders = [
  { icon: "⏰", title: "Team meeting", time: "4:00 PM" },
  { icon: "📚", title: "Reading goal", time: "7:00 PM (1h remaining)" },
  { icon: "🎯", title: "Weekly review", time: "2 goals due tomorrow" },
];

const Reminders = () => {
  return (
    <div className="card reminders-card">
      <div className="card-header">
        <h2>🔔 Reminders</h2>
      </div>
      <div className="reminders-list">
        {reminders.map((reminder) => (
          <div key={reminder.title} className="reminder-item">
            <span className="reminder-icon">{reminder.icon}</span>
            <div className="reminder-content">
              <div className="reminder-title">{reminder.title}</div>
              <div className="reminder-time">{reminder.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;
