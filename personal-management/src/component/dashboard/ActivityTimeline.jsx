const ActivityTimeline = ({
  activities,
  categoryColors,
  categoryEmojis,
  formatTime,
  formatDuration,
}) => {
  return (
    <div className="card timeline-card">
      <div className="card-header">
        <h2>📅 Today's Activity Timeline</h2>
        <button className="btn-add">+ Add Activity</button>
      </div>
      <div className="timeline">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="timeline-item">
              <div
                className="timeline-marker"
                style={{ background: categoryColors[activity.category] }}
              ></div>
              <div className="timeline-content">
                <div className="timeline-time">
                  {formatTime(activity.startTime)} -{" "}
                  {formatTime(activity.endTime)}
                </div>
                <div className="timeline-title">
                  <span className="timeline-emoji">
                    {categoryEmojis[activity.category]}
                  </span>
                  <span className="timeline-category">{activity.category}</span>
                  <span className="timeline-name">{activity.name}</span>
                </div>
                <div className="timeline-duration">
                  ({formatDuration(activity.startTime, activity.endTime)})
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No activities tracked today yet.</p>
            <p className="empty-subtitle">
              Start tracking to see your timeline!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;
