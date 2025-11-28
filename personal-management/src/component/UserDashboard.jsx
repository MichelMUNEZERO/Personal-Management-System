import { useMemo, useState } from "react";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import ActivityForm from "./ActivityForm";
import Footer from "./Footer";
import "./UserDashboard.css";

const GOAL_TARGETS = {
  work: 6,
  learning: 2,
  exercise: 1,
  leisure: 1,
};

const formatTime = (date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));

const formatSessionLength = (minutes) => {
  if (!minutes) return "0m";
  const normalized = Math.max(1, Math.round(minutes));
  const hrs = Math.floor(normalized / 60);
  const mins = normalized % 60;
  if (hrs === 0) return `${mins}m`;
  return mins === 0 ? `${hrs}h` : `${hrs}h ${mins}m`;
};

const calculateSummary = (activities = []) => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 6);
  const endOfToday = new Date(startOfToday.getTime() + 86400000);

  let todayMinutes = 0;
  let weekMinutes = 0;
  let totalMinutes = 0;
  const categoryMinutes = {};

  activities.forEach((activity) => {
    const start = new Date(activity.startTime);
    const end = new Date(activity.endTime);
    const duration = Math.max(0, (end - start) / (1000 * 60));

    totalMinutes += duration;
    categoryMinutes[activity.category] =
      (categoryMinutes[activity.category] || 0) + duration;

    if (start >= startOfWeek) {
      weekMinutes += duration;
    }

    if (start >= startOfToday && start < endOfToday) {
      todayMinutes += duration;
    }
  });

  const highlights = Object.entries(categoryMinutes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category, minutes]) => ({
      category,
      hours: (minutes / 60).toFixed(1),
    }));

  const goalsMet = Object.entries(GOAL_TARGETS).filter(
    ([category, targetHours]) =>
      (categoryMinutes[category] || 0) / 60 >= targetHours
  ).length;

  const averageSession = Math.round(
    totalMinutes / Math.max(activities.length, 1)
  );

  const recentActivities = activities.slice(0, 3).map((activity) => ({
    id: activity.id,
    name: activity.name,
    category: activity.category,
    startTime: activity.startTime,
    endTime: activity.endTime,
    durationMinutes: Math.round(
      (new Date(activity.endTime) - new Date(activity.startTime)) / (1000 * 60)
    ),
  }));

  return {
    todayHours: (todayMinutes / 60).toFixed(1),
    weekHours: (weekMinutes / 60).toFixed(1),
    totalActivities: activities.length,
    goalsMet,
    goalCount: Object.keys(GOAL_TARGETS).length,
    averageSession,
    activeCategories: Object.keys(categoryMinutes).length,
    highlights,
    recentActivities,
  };
};

const UserDashboard = ({ user, activities, onAddActivity, onLogout }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const summary = useMemo(() => calculateSummary(activities), [activities]);

  const initials = (user?.name || "Productive User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const summaryCards = [
    {
      label: "Today's Focus",
      value: `${summary.todayHours}h`,
      sub: "time tracked",
    },
    {
      label: "Week Total",
      value: `${summary.weekHours}h`,
      sub: "last 7 days",
    },
    {
      label: "Activities",
      value: summary.totalActivities,
      sub: "logged overall",
    },
    {
      label: "Goals",
      value: `${summary.goalsMet}/${summary.goalCount}`,
      sub: "met today",
    },
    {
      label: "Avg Session",
      value: formatSessionLength(summary.averageSession),
      sub: "per activity",
    },
    {
      label: "Categories",
      value: summary.activeCategories,
      sub: "active today",
    },
  ];

  const renderTopbar = () => (
    <header className="dashboard-topbar">
      <div className="topbar-search">
        <input type="search" placeholder="Search activities, notes, or teams" />
      </div>
      <div className="topbar-actions">
        <button className="ghost">+ New</button>
        <button className="ghost">Filters</button>
        <div className="topbar-user">
          <div className="user-meta">
            <strong>{user?.name || "Productive User"}</strong>
            <p>{user?.email || "user@workspace"}</p>
          </div>
          <div className="user-avatar">{initials}</div>
        </div>
      </div>
    </header>
  );

  const renderOverview = () => (
    <div className="overview-body">
      <div className="overview-main">
        <section className="map-card">
          <div className="map-visual">
            <span className="map-pulse primary" />
            <span className="map-pulse secondary" />
          </div>
          <div className="map-details">
            <p className="eyebrow">Workspace overview</p>
            <h2>
              {user?.name ? `${user.name.split(" ")[0]}'s board` : "Live board"}
            </h2>
            <p>
              Track activity hotspots and keep an eye on the most active
              categories at a glance.
            </p>
            <div className="map-tags">
              {(summary.highlights.length
                ? summary.highlights
                : [{ category: "No data", hours: "0.0" }]
              ).map((highlight) => (
                <div key={highlight.category} className="map-tag">
                  <span>{highlight.category}</span>
                  <strong>{highlight.hours}h</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="summary-grid">
          {summaryCards.map((card) => (
            <article key={card.label} className="summary-card">
              <p>{card.label}</p>
              <h3>{card.value}</h3>
              <span>{card.sub}</span>
            </article>
          ))}
        </section>

        <section className="recent-panel">
          <div>
            <h3>Recent Activities</h3>
            <p>Latest sessions synced from your logger</p>
          </div>
          <div className="recent-list">
            {summary.recentActivities.length === 0 ? (
              <p className="empty-state">No activities logged yet.</p>
            ) : (
              summary.recentActivities.map((activity) => (
                <div key={activity.id} className="recent-item">
                  <div>
                    <strong>{activity.name}</strong>
                    <span>{activity.category}</span>
                  </div>
                  <div>
                    <p>
                      {formatTime(activity.startTime)} -{" "}
                      {formatTime(activity.endTime)}
                    </p>
                    <small>
                      {formatSessionLength(activity.durationMinutes)}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <aside className="overview-rail">
        <div className="rail-card quick-log">
          <div className="rail-card-header">
            <div>
              <p className="eyebrow">Quick entry</p>
              <h3>Log activity</h3>
            </div>
            <button
              className="ghost"
              onClick={() => setActiveSection("logger")}
            >
              Expand
            </button>
          </div>
          <ActivityForm
            onAddActivity={onAddActivity}
            activities={activities}
            showRecentActivities={false}
          />
        </div>

        <div className="rail-card info-card">
          <p className="eyebrow">Targets</p>
          <h3>Goal tracker</h3>
          <ul>
            {Object.entries(GOAL_TARGETS).map(([category, target]) => (
              <li key={category}>
                <span>{category}</span>
                <strong>{target}h</strong>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );

  const renderLogger = () => (
    <div className="logger-view">
      <h2>Activity Logger</h2>
      <ActivityForm onAddActivity={onAddActivity} activities={activities} />
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-view">
      <Dashboard activities={activities} />
    </div>
  );

  const renderSection = () => {
    if (activeSection === "logger") return renderLogger();
    if (activeSection === "analytics") return renderAnalytics();
    return renderOverview();
  };

  return (
    <div className="user-dashboard-shell">
      <Navigation
        currentPage={activeSection}
        onNavigate={setActiveSection}
        user={user}
        onLogout={onLogout}
      />
      <div className="dashboard-workspace">
        {renderTopbar()}
        <div className="dashboard-scroll">
          <div className="dashboard-content">{renderSection()}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
