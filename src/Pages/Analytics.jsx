import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaChartLine,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaTrophy,
  FaFire,
  FaChartBar,
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "./Analytics.css";

export default function Analytics() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("week");

  // Mock data for statistics
  const stats = {
    tasksCompleted: 47,
    tasksCompletedChange: 12,
    totalHours: 38.5,
    totalHoursChange: -5,
    productivity: 87,
    productivityChange: 8,
    currentStreak: 15,
    streakChange: 3,
  };

  // Mock data for weekly productivity
  const weeklyData = [
    { day: "Mon", hours: 6.5, tasks: 8, productivity: 85 },
    { day: "Tue", hours: 7.2, tasks: 10, productivity: 92 },
    { day: "Wed", hours: 5.8, tasks: 7, productivity: 78 },
    { day: "Thu", hours: 8.1, tasks: 12, productivity: 95 },
    { day: "Fri", hours: 6.9, tasks: 9, productivity: 88 },
    { day: "Sat", hours: 4.2, tasks: 5, productivity: 70 },
    { day: "Sun", hours: 3.8, tasks: 4, productivity: 65 },
  ];

  // Mock data for task categories
  const categoryData = [
    { name: "Work", value: 45, color: "#5a6945" },
    { name: "Personal", value: 25, color: "#6b7a54" },
    { name: "Learning", value: 20, color: "#8a9876" },
    { name: "Other", value: 10, color: "#a8b89c" },
  ];

  // Mock data for monthly comparison
  const monthlyComparison = [
    { month: "Sep", tasks: 142, hours: 168 },
    { month: "Oct", tasks: 156, hours: 182 },
    { month: "Nov", tasks: 178, hours: 195 },
    { month: "Dec", tasks: 189, hours: 203 },
  ];

  // Mock data for time distribution
  const timeDistribution = [
    { label: "Focus Time", percentage: 65, hours: 25 },
    { label: "Meetings", percentage: 15, hours: 5.8 },
    { label: "Breaks", percentage: 10, hours: 3.9 },
    { label: "Other", percentage: 10, hours: 3.8 },
  ];

  // Recent achievements
  const achievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "Completed all tasks for 5 days straight",
      icon: "🏆",
    },
    {
      id: 2,
      title: "Early Bird",
      description: "Started work before 8 AM for 7 days",
      icon: "🌅",
    },
    {
      id: 3,
      title: "Focus Master",
      description: "Completed 20 Pomodoro sessions",
      icon: "🎯",
    },
  ];

  const maxHours = Math.max(...weeklyData.map((d) => d.hours));
  const maxTasks = Math.max(...weeklyData.map((d) => d.tasks));

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        {/* Header */}
        <div className="analytics-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>
          <div className="header-content">
            <h1>
              <FaChartLine /> Analytics & Reports
            </h1>
            <p>Track your productivity and analyze your performance</p>
          </div>
          <div className="time-range-selector">
            <button
              className={timeRange === "week" ? "active" : ""}
              onClick={() => setTimeRange("week")}
            >
              Week
            </button>
            <button
              className={timeRange === "month" ? "active" : ""}
              onClick={() => setTimeRange("month")}
            >
              Month
            </button>
            <button
              className={timeRange === "year" ? "active" : ""}
              onClick={() => setTimeRange("year")}
            >
              Year
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon tasks">
              <FaTasks />
            </div>
            <div className="stat-content">
              <h3>Tasks Completed</h3>
              <p className="stat-value">{stats.tasksCompleted}</p>
              <span
                className={`stat-change ${
                  stats.tasksCompletedChange > 0 ? "positive" : "negative"
                }`}
              >
                {stats.tasksCompletedChange > 0 ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDown />
                )}
                {Math.abs(stats.tasksCompletedChange)}% from last {timeRange}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon hours">
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>Total Hours</h3>
              <p className="stat-value">{stats.totalHours}h</p>
              <span
                className={`stat-change ${
                  stats.totalHoursChange > 0 ? "positive" : "negative"
                }`}
              >
                {stats.totalHoursChange > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(stats.totalHoursChange)}% from last {timeRange}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon productivity">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>Productivity Score</h3>
              <p className="stat-value">{stats.productivity}%</p>
              <span
                className={`stat-change ${
                  stats.productivityChange > 0 ? "positive" : "negative"
                }`}
              >
                {stats.productivityChange > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(stats.productivityChange)}% from last {timeRange}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon streak">
              <FaFire />
            </div>
            <div className="stat-content">
              <h3>Current Streak</h3>
              <p className="stat-value">{stats.currentStreak} days</p>
              <span
                className={`stat-change ${
                  stats.streakChange > 0 ? "positive" : "negative"
                }`}
              >
                {stats.streakChange > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(stats.streakChange)} days from last {timeRange}
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Weekly Activity Chart */}
          <div className="chart-card full-width">
            <div className="card-header">
              <h2>
                <FaChartBar /> Weekly Activity
              </h2>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color hours-color"></span> Hours
                </span>
                <span className="legend-item">
                  <span className="legend-color tasks-color"></span> Tasks
                </span>
              </div>
            </div>
            <div className="bar-chart">
              {weeklyData.map((day) => (
                <div key={day.day} className="bar-group">
                  <div className="bars">
                    <div
                      className="bar hours-bar"
                      style={{ height: `${(day.hours / maxHours) * 100}%` }}
                      data-value={day.hours + "h"}
                    ></div>
                    <div
                      className="bar tasks-bar"
                      style={{ height: `${(day.tasks / maxTasks) * 100}%` }}
                      data-value={day.tasks}
                    ></div>
                  </div>
                  <span className="bar-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Categories */}
          <div className="chart-card">
            <div className="card-header">
              <h2>
                <FaChartPie /> Task Categories
              </h2>
            </div>
            <div className="donut-chart">
              <div className="donut-container">
                <svg viewBox="0 0 100 100" className="donut">
                  {categoryData.reduce((acc, item, index) => {
                    const prevTotal = categoryData
                      .slice(0, index)
                      .reduce((sum, i) => sum + i.value, 0);
                    const offset = (prevTotal / 100) * 360;
                    const dashArray = `${item.value} ${100 - item.value}`;
                    acc.push(
                      <circle
                        key={item.name}
                        cx="50"
                        cy="50"
                        r="15.915"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="10"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 50 50)"
                      />
                    );
                    return acc;
                  }, [])}
                </svg>
                <div className="donut-center">
                  <span className="donut-total">100%</span>
                  <span className="donut-label">Tasks</span>
                </div>
              </div>
              <div className="category-list">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="category-item">
                    <span
                      className="category-color"
                      style={{ background: cat.color }}
                    ></span>
                    <span className="category-name">{cat.name}</span>
                    <span className="category-value">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="chart-card">
            <div className="card-header">
              <h2>
                <FaCalendarAlt /> Monthly Progress
              </h2>
            </div>
            <div className="line-chart">
              <div className="chart-area">
                <svg viewBox="0 0 400 200" className="line-svg">
                  {/* Grid lines */}
                  <line
                    x1="0"
                    y1="40"
                    x2="400"
                    y2="40"
                    stroke="#e1e8ed"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="80"
                    x2="400"
                    y2="80"
                    stroke="#e1e8ed"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="120"
                    x2="400"
                    y2="120"
                    stroke="#e1e8ed"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="160"
                    x2="400"
                    y2="160"
                    stroke="#e1e8ed"
                    strokeWidth="1"
                  />

                  {/* Tasks line */}
                  <polyline
                    points={monthlyComparison
                      .map(
                        (m, i) =>
                          `${i * 100 + 50},${200 - (m.tasks / 200) * 160}`
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#5a6945"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Data points */}
                  {monthlyComparison.map((m, i) => (
                    <circle
                      key={i}
                      cx={i * 100 + 50}
                      cy={200 - (m.tasks / 200) * 160}
                      r="5"
                      fill="#5a6945"
                      className="data-point"
                    />
                  ))}
                </svg>
              </div>
              <div className="chart-labels">
                {monthlyComparison.map((m) => (
                  <span key={m.month} className="label">
                    {m.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Time Distribution */}
          <div className="chart-card full-width">
            <div className="card-header">
              <h2>
                <FaClock /> Time Distribution
              </h2>
            </div>
            <div className="progress-bars">
              {timeDistribution.map((item) => (
                <div key={item.label} className="progress-item">
                  <div className="progress-info">
                    <span className="progress-label">{item.label}</span>
                    <span className="progress-value">
                      {item.hours}h ({item.percentage}%)
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="chart-card full-width">
            <div className="card-header">
              <h2>
                <FaTrophy /> Recent Achievements
              </h2>
            </div>
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  <FaCheckCircle className="achievement-check" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
