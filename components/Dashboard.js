// components/Dashboard.js
import React from "react";

const Dashboard = ({ tasks, notes, goals }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high" && !task.completed
  ).length;

  const upcomingGoals = goals
    .filter((goal) => !goal.completed)
    .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
    .slice(0, 3);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <span className="stat-number">{tasks.length}</span>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <span className="stat-number">{completedTasks}</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <span className="stat-number">{pendingTasks}</span>
        </div>
        <div className="stat-card">
          <h3>High Priority</h3>
          <span className="stat-number">{highPriorityTasks}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Recent Notes</h3>
          <div className="recent-notes">
            {notes.slice(-3).map((note) => (
              <div key={note.id} className="recent-note">
                <p>{note.content.substring(0, 100)}...</p>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Upcoming Goals</h3>
          <div className="upcoming-goals">
            {upcomingGoals.map((goal) => (
              <div key={goal.id} className="upcoming-goal">
                <h4>{goal.title}</h4>
                <p>Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <span>{goal.progress}% Complete</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
