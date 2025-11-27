import { useState, useEffect } from "react";
import "./Dashboard.css";
import DashboardHeader from "./dashboard/DashboardHeader";
import QuickStats from "./dashboard/QuickStats";
import ActivityTimeline from "./dashboard/ActivityTimeline";
import RecentActivities from "./dashboard/RecentActivities";
import GoalsProgress from "./dashboard/GoalsProgress";
import WeeklyOverview from "./dashboard/WeeklyOverview";
import WeeklyPerformance from "./dashboard/WeeklyPerformance";
import QuickActions from "./dashboard/QuickActions";
import InsightsPanel from "./dashboard/InsightsPanel";
import Reminders from "./dashboard/Reminders";

const Dashboard = ({ activities = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate comprehensive dashboard metrics
    return (
      <div className="dashboard">
        <DashboardHeader currentTime={currentTime} />
        <QuickStats
          stats={{
            todayCompleted: dashboardData.todayCompleted,
            todayTimeTracked: dashboardData.todayTimeTracked,
            goalsAchieved: dashboardData.goalsAchieved,
            totalGoals: dashboardData.totalGoals,
            productivityScore: dashboardData.productivityScore,
          }}
        />

        <div className="dashboard-grid">
          <div className="dashboard-column">
            <ActivityTimeline
              activities={dashboardData.todayActivities}
              categoryColors={categoryColors}
              categoryEmojis={categoryEmojis}
              formatTime={formatTime}
              formatDuration={formatDuration}
            />
            <RecentActivities
              activities={activities.slice(0, 4)}
              categoryColors={categoryColors}
              categoryEmojis={categoryEmojis}
              formatTime={formatTime}
              formatDuration={formatDuration}
            />
          </div>

          <div className="dashboard-column">
            <GoalsProgress
              goals={dashboardData.goalsProgress}
              categoryColors={categoryColors}
              categoryEmojis={categoryEmojis}
            />
            <WeeklyOverview
              dailyHours={dashboardData.dailyHours}
              maxDailyHours={maxDailyHours}
            />
            <WeeklyPerformance dailyHours={dashboardData.dailyHours} />
          </div>

          <div className="dashboard-column">
            <QuickActions />
            <InsightsPanel weekActivities={dashboardData.weekActivities} />
            <Reminders />
          </div>
        </div>
      </div>
    );
          </div>

          {/* Weekly Overview Chart */}
          <div className="card chart-card">
            <div className="card-header">
              <h2>📊 Weekly Overview</h2>
            </div>
            <div className="bar-chart">
              {Object.entries(dashboardData.dailyHours).map(([day, hours]) => (
                <div key={day} className="chart-bar-wrapper">
                  <div className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${(hours / maxDailyHours) * 100}%`,
                        background:
                          hours > 0
                            ? "linear-gradient(135deg, #f4a5b9, #e08a9f)"
                            : "#f0f0f0",
                      }}
                    >
                      {hours > 0 && (
                        <span className="chart-value">{hours.toFixed(1)}h</span>
                      )}
                    </div>
                  </div>
                  <div className="chart-label">{day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Performance */}
          <div className="card performance-card">
            <div className="card-header">
              <h2>📈 Weekly Performance</h2>
            </div>
            <div className="performance-list">
              {Object.entries(dashboardData.dailyHours).map(([day, hours]) => {
                const percentage = Math.min(100, (hours / 8) * 100);
                return (
                  <div key={day} className="performance-item">
                    <span className="perf-day">{day}:</span>
                    <div className="perf-bar">
                      <div
                        className="perf-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="perf-value">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 3: Actions & Insights */}
        <div className="dashboard-column">
          {/* Quick Actions */}
          <div className="card actions-card">
            <div className="card-header">
              <h2>⚡ Quick Actions</h2>
            </div>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">➕</span>
                <span className="action-text">Log New Activity</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">⏱️</span>
                <span className="action-text">Start Timer</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">🎯</span>
                <span className="action-text">Set Daily Goal</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                <span className="action-text">View Weekly Report</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">⚙️</span>
                <span className="action-text">Settings</span>
              </button>
            </div>
          </div>

          {/* Insights & Notifications */}
          <div className="card insights-card">
            <div className="card-header">
              <h2>💡 Today's Insights</h2>
            </div>
            <div className="insights-list">
              <div className="insight-item">
                <span className="insight-icon">📊</span>
                <p>Your most productive time is 10AM-12PM</p>
              </div>
              <div className="insight-item">
                <span className="insight-icon">✅</span>
                <p>You're on track to hit your work goal</p>
              </div>
              <div className="insight-item">
                <span className="insight-icon">💪</span>
                <p>
                  Exercise consistency: {dashboardData.weekActivities}{" "}
                  activities this week
                </p>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🎯</span>
                <p>Keep up the great tracking habit!</p>
              </div>
            </div>
          </div>

          {/* Upcoming & Reminders */}
          <div className="card reminders-card">
            <div className="card-header">
              <h2>🔔 Reminders</h2>
            </div>
            <div className="reminders-list">
              <div className="reminder-item">
                <span className="reminder-icon">⏰</span>
                <div className="reminder-content">
                  <div className="reminder-title">Team meeting</div>
                  <div className="reminder-time">4:00 PM</div>
                </div>
              </div>
              <div className="reminder-item">
                <span className="reminder-icon">📚</span>
                <div className="reminder-content">
                  <div className="reminder-title">Reading goal</div>
                  <div className="reminder-time">7:00 PM (1h remaining)</div>
                </div>
              </div>
              <div className="reminder-item">
                <span className="reminder-icon">🎯</span>
                <div className="reminder-content">
                  <div className="reminder-title">Weekly review</div>
                  <div className="reminder-time">2 goals due tomorrow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
