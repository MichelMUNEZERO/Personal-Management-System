import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div>Active Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div>Notes Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div>Goals In Progress</div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Notes</h2>
          <div className="recent-notes">
            <div className="recent-note">No recent notes</div>
          </div>
        </div>
        <div className="dashboard-section">
          <h2>Upcoming Goals</h2>
          <div className="upcoming-goals">
            <div className="upcoming-goal">No upcoming goals</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
