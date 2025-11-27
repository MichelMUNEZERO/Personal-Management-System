const RecentActivities = ({
  activities,
  categoryColors,
  categoryEmojis,
  formatTime,
  formatDuration,
}) => {
  if (!activities.length) return null;

  return (
    <div className="card activities-feed-card">
      <div className="card-header">
        <h2>🕒 Recent Activities</h2>
      </div>
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div
              className="activity-icon"
              style={{ background: categoryColors[activity.category] }}
            >
              {categoryEmojis[activity.category]}
            </div>
            <div className="activity-details">
              <div className="activity-name">{activity.name}</div>
              <div className="activity-meta">
                {formatTime(activity.startTime)} -{" "}
                {formatTime(activity.endTime)} | {activity.category}
              </div>
            </div>
            <div className="activity-duration">
              {formatDuration(activity.startTime, activity.endTime)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
