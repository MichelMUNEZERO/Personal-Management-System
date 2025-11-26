import { useState, useEffect } from "react";
import "./ActivityForm.css";

const ActivityForm = ({ onAddActivity, activities = [] }) => {
  const [activityName, setActivityName] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const categories = [
    { value: "work", label: "Work", emoji: "💼" },
    { value: "exercise", label: "Exercise", emoji: "💪" },
    { value: "learning", label: "Learning", emoji: "📚" },
    { value: "leisure", label: "Leisure", emoji: "🎮" },
    { value: "other", label: "Other", emoji: "🔹" },
  ];

  const categoryColors = {
    work: "#3498db",
    exercise: "#e74c3c",
    learning: "#9b59b6",
    leisure: "#2ecc71",
    other: "#f39c12",
  };

  const calculateDuration = (start, end) => {
    const durationMs = end - start;
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    let durationText = "";
    if (hours > 0) {
      durationText += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      durationText += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return durationText || "0 minutes";
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  useEffect(() => {
    // Set default times
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    setStartTime(oneHourAgo.toISOString().slice(0, 16));
    setEndTime(now.toISOString().slice(0, 16));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    const activity = {
      id: Date.now(),
      name: activityName,
      category,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      notes,
    };

    onAddActivity(activity);

    // Reset form
    setActivityName("");
    setCategory("");
    setNotes("");

    // Reset times to default
    const newNow = new Date();
    const newOneHourAgo = new Date(newNow.getTime() - 60 * 60 * 1000);
    setStartTime(newOneHourAgo.toISOString().slice(0, 16));
    setEndTime(newNow.toISOString().slice(0, 16));

    alert("Activity logged successfully!");
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="activityName">Activity Name</label>
            <input
              type="text"
              id="activityName"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="What are you doing? (e.g., Gym, Reading, Work...)"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="category-options">
              {categories.map((cat) => (
                <div
                  key={cat.value}
                  className={`category-option ${
                    category === cat.value ? "selected" : ""
                  }`}
                  onClick={() => setCategory(cat.value)}
                >
                  {cat.emoji} {cat.label}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Time Tracking</label>
            <div className="time-inputs">
              <div>
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime">End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="activityNotes">Notes (Optional)</label>
            <textarea
              id="activityNotes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes about this activity..."
            />
          </div>

          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <div className="activity-list">
          {activities.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
              No activities logged yet. Start tracking your activities above!
            </p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-header">
                  <div className="activity-name">{activity.name}</div>
                  <div
                    className="activity-category"
                    style={{ background: categoryColors[activity.category] }}
                  >
                    {activity.category.charAt(0).toUpperCase() +
                      activity.category.slice(1)}
                  </div>
                </div>
                <div className="activity-time">
                  Today, {formatTime(activity.startTime)} -{" "}
                  {formatTime(activity.endTime)}
                </div>
                <div className="activity-duration">
                  Duration:{" "}
                  {calculateDuration(activity.startTime, activity.endTime)}
                </div>
                {activity.notes && (
                  <div className="activity-notes">Note: {activity.notes}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityForm;
