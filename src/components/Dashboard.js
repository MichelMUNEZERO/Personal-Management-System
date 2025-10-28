import React from "react";

const Dashboard = ({ tasks, notes, goals }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div style={{ marginTop: "20px" }}>
        <h3>Tasks ({tasks?.length || 0})</h3>
        <h3>Notes ({notes?.length || 0})</h3>
        <h3>Goals ({goals?.length || 0})</h3>
      </div>
    </div>
  );
};

export default Dashboard;
