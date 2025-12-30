import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaEye,
  FaChartLine,
  FaChevronDown,
  FaEdit,
  FaEllipsisV,
  FaClock,
  FaPlay,
  FaPause,
  FaPlus,
  FaSync,
  FaCheck,
  FaUser,
  FaBars,
  FaTimes,
  FaCog,
  FaTasks,
} from "react-icons/fa";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [pomodoroTime, setPomodoroTime] = useState({ minutes: 25, seconds: 0 });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calendar data
  const daysInMonth = new Date(2025, 11, 0).getDate(); // December 2025
  const firstDayOfMonth = new Date(2025, 11, 1).getDay();

  const dayNames = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  // Tasks data
  const upcomingTasks = [
    { id: 1, text: "Review design mockups", status: "in-progress" },
    { id: 2, text: "Update project timeline", status: "pending" },
    { id: 3, text: "Send weekly report", status: "pending" },
    { id: 4, text: "Team standup meeting", status: "completed" },
    { id: 5, text: "Fix navigation bug", status: "pending" },
    { id: 6, text: "Prepare presentation", status: "pending" },
  ];

  const monthGoals = [
    { id: 1, text: "Complete project proposal", completed: true },
    { id: 2, text: "Learn new framework", completed: false },
    { id: 3, text: "Read 2 books", completed: false },
    { id: 4, text: "Exercise 12 times", completed: false },
  ];

  const weekGoals = [
    { id: 1, text: "Finish design review", completed: true },
    { id: 2, text: "Weekly team-sync", completed: true },
    { id: 3, text: "Update documentation", completed: false },
  ];

  const taskReminders = [
    { id: 1, title: "Complete 303 project", time: "10pm", icon: "🔥" },
    { id: 2, title: "Work on UX Challenge", time: "2pm", icon: "💼" },
    { id: 3, title: "Call mom", time: "6pm", icon: "📞" },
  ];

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 15; // December 15th as shown in the image
      days.push(
        <div key={day} className={`calendar-day ${isToday ? "today" : ""}`}>
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Toggle */}
      <button
        className="menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">2026 Planner</div>

        <div className="sidebar-section">
          <div className="section-title">
            <span>MORE PLANNING</span>
            <FaChevronDown />
          </div>
          <ul className="sidebar-menu">
            <li className="active">
              <FaCalendar />
              <span>Dashboard / My Day</span>
            </li>
            <li onClick={() => navigate("/analytics")}>
              <FaChartLine />
              <span>Analytics & Reports</span>
            </li>
            <li>
              <FaEye />
              <span>Daily View</span>
            </li>
            <li>
              <FaChartLine />
              <span>Weekly View</span>
            </li>
            <li>
              <FaCalendar />
              <span>Monthly View</span>
            </li>
            <li>
              <FaCalendar />
              <span>Yearly Overview (2026)</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <div className="section-title">
            <span>PRODUCTIVITY</span>
            <FaChevronDown />
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => navigate("/tasks")}>
              <FaTasks />
              <span>Task Manager</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <div className="section-title">
            <span>PERSONAL GROWTH</span>
            <FaChevronDown />
          </div>
        </div>

        <div className="sidebar-section">
          <div className="section-title">
            <span>UTILITY</span>
            <FaChevronDown />
          </div>
        </div>

        <div className="sidebar-section">
          <div className="section-title">
            <span>EXTRA</span>
            <FaChevronDown />
          </div>
        </div>

        <div className="sidebar-footer">
          <button
            className="settings-link"
            onClick={() => navigate("/settings")}
          >
            <FaCog />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Grid - Calendar, Daily Overview, and Upcoming Tasks */}
        <div className="dashboard-grid">
          {/* Monthly Schedule Calendar */}
          <div className="calendar-card">
            <div className="calendar-header">
              <div>
                <div className="calendar-title">Monthly Schedule</div>
                <div className="calendar-subtitle">
                  Complete the rest of your January's schedule to plan ahead
                </div>
              </div>
              <div className="monthly-goal">
                <div className="goal-label">monthly goal</div>
                <div className="goal-percentage">60%</div>
              </div>
            </div>

            <div className="calendar-month">
              <div className="month-name">DEC</div>
              <div className="complete-badge">Complete</div>
            </div>

            <div className="calendar-grid">
              {dayNames.map((day) => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>

            <button className="sync-button">Sync with google calendar</button>
          </div>

          {/* Daily Overview */}
          <div className="daily-overview">
            <div className="time-sections">
              <div className="time-section">Morning</div>
              <div className="time-section">Afternoon</div>
              <div className="time-section">Evening</div>
            </div>

            <div className="mood-section">
              <div className="mood-header">
                <div>
                  <div className="mood-title">My mood: Regular</div>
                  <div className="mood-subtitle">4 more tasks to complete</div>
                </div>
                <div className="energy-badge">
                  energy
                  <br />
                  GU
                </div>
              </div>
              <div className="mood-progress">
                <div
                  className="mood-progress-bar"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div className="overall-info">
              <div className="info-title">Overall information</div>
              <div className="info-stats">
                <div className="stat-item">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Tasks done</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2</div>
                  <div className="stat-label">Paused projects</div>
                </div>
              </div>
            </div>

            <div className="task-boxes">
              <div className="task-box">
                <div className="task-box-number">24</div>
                <div className="task-box-label">tasks</div>
              </div>
              <div className="task-box">
                <div className="task-box-number">8</div>
                <div className="task-box-label">in progress</div>
              </div>
              <div className="task-box">
                <div className="task-box-number">12</div>
                <div className="task-box-label">Done</div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="upcoming-tasks">
            <h3 className="card-title">Upcoming tasks</h3>
            <ul className="task-list">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="task-item">
                  <div className={`task-checkbox ${task.status}`}>
                    {task.status === "completed" && <FaCheck />}
                  </div>
                  <span
                    className={`task-text ${
                      task.status === "completed" ? "completed" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Grid - Goals, Reminders, Week Goals */}
        <div className="bottom-grid">
          {/* Month Goals */}
          <div className="goals-card">
            <div className="card-header">
              <h3>Month goals:</h3>
              <FaEdit className="edit-icon" />
            </div>
            <ul className="goal-list">
              {monthGoals.map((goal) => (
                <li key={goal.id} className="goal-item">
                  <div
                    className={`goal-icon ${goal.completed ? "completed" : ""}`}
                  ></div>
                  <span>{goal.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Task Reminders */}
          <div className="reminders-card">
            <div className="card-header">
              <h3>Tasks Reminders(3)</h3>
            </div>
            <div className="reminder-list">
              {taskReminders.map((reminder) => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-header">
                    <div className="reminder-title">{reminder.title}</div>
                    <FaEllipsisV className="reminder-menu" />
                  </div>
                  <div className="reminder-time">
                    <FaClock />
                    <span>{reminder.time}</span>
                    <div className="reminder-badge">{reminder.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week Goals */}
          <div className="goals-card">
            <div className="card-header">
              <h3>Week goals:</h3>
              <FaEdit className="edit-icon" />
            </div>
            <ul className="goal-list">
              {weekGoals.map((goal) => (
                <li key={goal.id} className="goal-item">
                  <div
                    className={`goal-icon ${goal.completed ? "completed" : ""}`}
                  ></div>
                  <span>{goal.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Achievement Notification */}
        <div className="achievement-card">
          <div className="achievement-icon">
            <FaUser />
          </div>
          <div className="achievement-content">
            <div className="achievement-title">Well done!</div>
            <div className="achievement-text">
              You completed your morning routine today
            </div>
            <a href="#" className="achievement-link">
              View details →
            </a>
          </div>
        </div>

        {/* Pomodoro Timer and Daily Affirmation */}
        <div className="timer-affirmation-grid">
          {/* Pomodoro Timer */}
          <div className="pomodoro-card">
            <div className="timer-label">Pomodoro timer</div>
            <div className="timer-display">
              {String(pomodoroTime.minutes).padStart(2, "0")}:
              {String(pomodoroTime.seconds).padStart(2, "0")}
            </div>
            <div className="timer-controls">
              <button className="timer-button">
                {isTimerRunning ? <FaPause /> : <FaPlay />}
              </button>
              <button className="timer-button">
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Daily Affirmation */}
          <div className="affirmation-card">
            <div className="affirmation-content">
              <div className="affirmation-title">
                Daily Affirmation
                <button className="refresh-button">
                  <FaSync />
                </button>
              </div>
              <div className="affirmation-text">
                "You are capable of far more than you imagine; trust in your
                inner wisdom and take one powerful, intentional step forward
                today."
              </div>
            </div>
            <div className="affirmation-icon">▶</div>
          </div>
        </div>
      </main>
    </div>
  );
}
