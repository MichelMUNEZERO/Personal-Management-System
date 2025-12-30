import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaFire,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaCheck,
  FaCalendarAlt,
  FaChartLine,
  FaDumbbell,
  FaBook,
  FaTint,
  FaBed,
  FaPray,
  FaRunning,
  FaAppleAlt,
  FaCode,
  FaClock,
  FaTrophy,
} from "react-icons/fa";
import "./Habits.css";

export default function Habits() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [newHabit, setNewHabit] = useState({
    name: "",
    icon: "FaDumbbell",
    color: "#5a6945",
    frequency: "daily",
    goal: "1",
  });

  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Morning Exercise",
      icon: "FaDumbbell",
      color: "#5a6945",
      frequency: "daily",
      goal: "1",
      currentStreak: 12,
      bestStreak: 28,
      completedDates: [
        "2025-12-31",
        "2025-12-30",
        "2025-12-29",
        "2025-12-28",
        "2025-12-27",
        "2025-12-26",
        "2025-12-25",
        "2025-12-24",
        "2025-12-23",
        "2025-12-22",
        "2025-12-21",
        "2025-12-20",
      ],
    },
    {
      id: 2,
      name: "Read 30 Minutes",
      icon: "FaBook",
      color: "#6b7a54",
      frequency: "daily",
      goal: "1",
      currentStreak: 8,
      bestStreak: 15,
      completedDates: [
        "2025-12-31",
        "2025-12-30",
        "2025-12-29",
        "2025-12-28",
        "2025-12-27",
        "2025-12-26",
        "2025-12-25",
        "2025-12-24",
      ],
    },
    {
      id: 3,
      name: "Drink 8 Glasses of Water",
      icon: "FaTint",
      color: "#8a9876",
      frequency: "daily",
      goal: "8",
      currentStreak: 5,
      bestStreak: 10,
      completedDates: [
        "2025-12-31",
        "2025-12-30",
        "2025-12-29",
        "2025-12-28",
        "2025-12-27",
      ],
    },
    {
      id: 4,
      name: "Meditation",
      icon: "FaPray",
      color: "#a8b89c",
      frequency: "daily",
      goal: "1",
      currentStreak: 3,
      bestStreak: 7,
      completedDates: ["2025-12-31", "2025-12-30", "2025-12-29"],
    },
    {
      id: 5,
      name: "Code Practice",
      icon: "FaCode",
      color: "#556342",
      frequency: "daily",
      goal: "1",
      currentStreak: 15,
      bestStreak: 30,
      completedDates: [
        "2025-12-31",
        "2025-12-30",
        "2025-12-29",
        "2025-12-28",
        "2025-12-27",
        "2025-12-26",
        "2025-12-25",
        "2025-12-24",
        "2025-12-23",
        "2025-12-22",
        "2025-12-21",
        "2025-12-20",
        "2025-12-19",
        "2025-12-18",
        "2025-12-17",
      ],
    },
  ]);

  const iconOptions = [
    { value: "FaDumbbell", label: "Exercise", icon: FaDumbbell },
    { value: "FaBook", label: "Reading", icon: FaBook },
    { value: "FaTint", label: "Water", icon: FaTint },
    { value: "FaBed", label: "Sleep", icon: FaBed },
    { value: "FaPray", label: "Meditation", icon: FaPray },
    { value: "FaRunning", label: "Running", icon: FaRunning },
    { value: "FaAppleAlt", label: "Nutrition", icon: FaAppleAlt },
    { value: "FaCode", label: "Coding", icon: FaCode },
  ];

  const colorOptions = [
    { value: "#5a6945", label: "Green" },
    { value: "#6b7a54", label: "Sage" },
    { value: "#8a9876", label: "Olive" },
    { value: "#a8b89c", label: "Mint" },
    { value: "#556342", label: "Forest" },
    { value: "#f59e0b", label: "Amber" },
    { value: "#10b981", label: "Emerald" },
    { value: "#6366f1", label: "Indigo" },
  ];

  const getIconComponent = (iconName) => {
    const iconMap = {
      FaDumbbell,
      FaBook,
      FaTint,
      FaBed,
      FaPray,
      FaRunning,
      FaAppleAlt,
      FaCode,
    };
    return iconMap[iconName] || FaDumbbell;
  };

  const isCompletedToday = (habit) => {
    const today = new Date().toISOString().split("T")[0];
    return habit.completedDates.includes(today);
  };

  const toggleHabitCompletion = (habitId) => {
    const today = new Date().toISOString().split("T")[0];
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(today);
          let updatedDates;
          let newStreak = habit.currentStreak;

          if (isCompleted) {
            updatedDates = habit.completedDates.filter(
              (date) => date !== today
            );
            newStreak = Math.max(0, habit.currentStreak - 1);
          } else {
            updatedDates = [...habit.completedDates, today].sort().reverse();
            newStreak = calculateStreak([...habit.completedDates, today]);
          }

          return {
            ...habit,
            completedDates: updatedDates,
            currentStreak: newStreak,
            bestStreak: Math.max(habit.bestStreak, newStreak),
          };
        }
        return habit;
      })
    );
  };

  const calculateStreak = (completedDates) => {
    if (completedDates.length === 0) return 0;

    const sortedDates = completedDates
      .map((date) => new Date(date))
      .sort((a, b) => b - a);

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mostRecent = new Date(sortedDates[0]);
    mostRecent.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));
    if (daysDiff > 1) return 0;

    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]);
      const next = new Date(sortedDates[i + 1]);
      const diff = Math.floor((current - next) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getCompletionRate = (habit) => {
    const last7Days = getLast7Days();
    const completed = last7Days.filter((day) => {
      const dateStr = day.toISOString().split("T")[0];
      return habit.completedDates.includes(dateStr);
    }).length;
    return Math.round((completed / 7) * 100);
  };

  const handleAddHabit = () => {
    const habit = {
      id: habits.length + 1,
      ...newHabit,
      currentStreak: 0,
      bestStreak: 0,
      completedDates: [],
    };
    setHabits([...habits, habit]);
    setShowAddModal(false);
    setNewHabit({
      name: "",
      icon: "FaDumbbell",
      color: "#5a6945",
      frequency: "daily",
      goal: "1",
    });
  };

  const handleEditHabit = () => {
    setHabits(
      habits.map((h) => (h.id === selectedHabit.id ? selectedHabit : h))
    );
    setShowEditModal(false);
    setSelectedHabit(null);
  };

  const handleDeleteHabit = (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      setHabits(habits.filter((h) => h.id !== id));
    }
  };

  const getOverallStats = () => {
    const totalHabits = habits.length;
    const completedToday = habits.filter((h) => isCompletedToday(h)).length;
    const totalStreaks = habits.reduce((sum, h) => sum + h.currentStreak, 0);
    const avgCompletion =
      habits.length > 0
        ? Math.round(
            habits.reduce((sum, h) => sum + getCompletionRate(h), 0) /
              habits.length
          )
        : 0;

    return { totalHabits, completedToday, totalStreaks, avgCompletion };
  };

  const stats = getOverallStats();
  const last7Days = getLast7Days();

  return (
    <div className="habits-page">
      <div className="habits-container">
        {/* Header */}
        <div className="habits-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Back
          </button>
          <div className="header-content">
            <h1>
              <FaFire /> Habit Tracker
            </h1>
            <p>Build lasting habits, one day at a time</p>
          </div>
          <button
            className="add-habit-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> New Habit
          </button>
        </div>

        {/* Overall Stats */}
        <div className="overall-stats">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#5a6945" }}>
              <FaFire />
            </div>
            <div className="stat-info">
              <h3>Total Habits</h3>
              <p>{stats.totalHabits}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#10b981" }}>
              <FaCheck />
            </div>
            <div className="stat-info">
              <h3>Completed Today</h3>
              <p>
                {stats.completedToday}/{stats.totalHabits}
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f59e0b" }}>
              <FaTrophy />
            </div>
            <div className="stat-info">
              <h3>Total Streaks</h3>
              <p>{stats.totalStreaks} days</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#6366f1" }}>
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>7-Day Average</h3>
              <p>{stats.avgCompletion}%</p>
            </div>
          </div>
        </div>

        {/* Current Date */}
        <div className="current-date">
          <FaCalendarAlt />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Habits List */}
        <div className="habits-list">
          {habits.length === 0 ? (
            <div className="no-habits">
              <FaFire />
              <p>No habits yet</p>
              <span>Start building better habits today!</span>
            </div>
          ) : (
            habits.map((habit) => {
              const IconComponent = getIconComponent(habit.icon);
              const completedToday = isCompletedToday(habit);
              const completionRate = getCompletionRate(habit);

              return (
                <div key={habit.id} className="habit-card">
                  <div className="habit-card-header">
                    <div
                      className="habit-icon"
                      style={{ background: habit.color }}
                    >
                      <IconComponent />
                    </div>
                    <div className="habit-info">
                      <h3>{habit.name}</h3>
                      <div className="habit-meta">
                        <span className="streak">
                          <FaFire /> {habit.currentStreak} day streak
                        </span>
                        <span className="best-streak">
                          Best: {habit.bestStreak} days
                        </span>
                      </div>
                    </div>
                    <div className="habit-actions">
                      <button
                        onClick={() => {
                          setSelectedHabit(habit);
                          setShowEditModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteHabit(habit.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="habit-progress">
                    <div className="progress-header">
                      <span>Last 7 Days</span>
                      <span className="completion-rate">{completionRate}%</span>
                    </div>
                    <div className="week-grid">
                      {last7Days.map((day, index) => {
                        const dateStr = day.toISOString().split("T")[0];
                        const isCompleted =
                          habit.completedDates.includes(dateStr);
                        const isToday =
                          dateStr === new Date().toISOString().split("T")[0];

                        return (
                          <div
                            key={index}
                            className={`day-cell ${
                              isCompleted ? "completed" : ""
                            } ${isToday ? "today" : ""}`}
                            style={{
                              borderColor: isCompleted
                                ? habit.color
                                : undefined,
                              background: isCompleted ? habit.color : undefined,
                            }}
                          >
                            <span className="day-name">
                              {day.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </span>
                            <span className="day-number">{day.getDate()}</span>
                            {isCompleted && <FaCheck className="check-icon" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="habit-footer">
                    <button
                      className={`complete-btn ${
                        completedToday ? "completed" : ""
                      }`}
                      onClick={() => toggleHabitCompletion(habit.id)}
                      style={{
                        background: completedToday ? habit.color : undefined,
                        borderColor: habit.color,
                      }}
                    >
                      {completedToday ? (
                        <>
                          <FaCheck /> Completed Today
                        </>
                      ) : (
                        <>
                          <FaClock /> Mark as Complete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaPlus /> Create New Habit
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Habit Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Morning Workout"
                  value={newHabit.name}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, name: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <select
                    value={newHabit.icon}
                    onChange={(e) =>
                      setNewHabit({ ...newHabit, icon: e.target.value })
                    }
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <select
                    value={newHabit.color}
                    onChange={(e) =>
                      setNewHabit({ ...newHabit, color: e.target.value })
                    }
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Frequency</label>
                  <select
                    value={newHabit.frequency}
                    onChange={(e) =>
                      setNewHabit({ ...newHabit, frequency: e.target.value })
                    }
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Goal (times per day)</label>
                  <input
                    type="number"
                    min="1"
                    value={newHabit.goal}
                    onChange={(e) =>
                      setNewHabit({ ...newHabit, goal: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={handleAddHabit}
                disabled={!newHabit.name}
              >
                <FaSave /> Create Habit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Habit Modal */}
      {showEditModal && selectedHabit && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaEdit /> Edit Habit
              </h2>
              <button onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Habit Name *</label>
                <input
                  type="text"
                  value={selectedHabit.name}
                  onChange={(e) =>
                    setSelectedHabit({ ...selectedHabit, name: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <select
                    value={selectedHabit.icon}
                    onChange={(e) =>
                      setSelectedHabit({
                        ...selectedHabit,
                        icon: e.target.value,
                      })
                    }
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <select
                    value={selectedHabit.color}
                    onChange={(e) =>
                      setSelectedHabit({
                        ...selectedHabit,
                        color: e.target.value,
                      })
                    }
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Frequency</label>
                  <select
                    value={selectedHabit.frequency}
                    onChange={(e) =>
                      setSelectedHabit({
                        ...selectedHabit,
                        frequency: e.target.value,
                      })
                    }
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Goal (times per day)</label>
                  <input
                    type="number"
                    min="1"
                    value={selectedHabit.goal}
                    onChange={(e) =>
                      setSelectedHabit({
                        ...selectedHabit,
                        goal: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleEditHabit}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
