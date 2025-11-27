const DashboardHeader = ({ currentTime }) => {
  return (
    <div className="dashboard-hero">
      <div className="welcome-section">
        <h1>Welcome back, User! 👋</h1>
        <p className="current-date">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
