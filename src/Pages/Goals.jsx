import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaTrophy,
  FaFlag,
  FaCheckCircle,
  FaCircle,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaChartLine,
  FaCalendarAlt,
  FaStar,
  FaFire,
  FaHeart,
  FaBriefcase,
  FaDumbbell,
  FaGraduationCap,
  FaDollarSign,
} from "react-icons/fa";
import "./Goals.css";

export default function Goals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [expandedGoal, setExpandedGoal] = useState(null);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "personal",
    type: "long-term",
    targetDate: "",
    progress: 0,
    milestones: [],
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Full Stack Development Course",
      description:
        "Master React, Node.js, and MongoDB to become a full-stack developer",
      category: "learning",
      type: "long-term",
      targetDate: "2025-06-30",
      progress: 65,
      createdAt: "2024-11-01",
      milestones: [
        { id: 1, text: "Complete React fundamentals", completed: true },
        { id: 2, text: "Build 3 React projects", completed: true },
        { id: 3, text: "Learn Node.js and Express", completed: true },
        { id: 4, text: "Master MongoDB", completed: false },
        { id: 5, text: "Build full-stack project", completed: false },
      ],
    },
    {
      id: 2,
      title: "Save $10,000 for Emergency Fund",
      description: "Build a 6-month emergency fund for financial security",
      category: "financial",
      type: "long-term",
      targetDate: "2025-12-31",
      progress: 42,
      createdAt: "2024-10-15",
      milestones: [
        { id: 1, text: "Save $2,000", completed: true },
        { id: 2, text: "Save $4,000", completed: true },
        { id: 3, text: "Save $6,000", completed: false },
        { id: 4, text: "Save $8,000", completed: false },
        { id: 5, text: "Reach $10,000", completed: false },
      ],
    },
    {
      id: 3,
      title: "Run a Marathon",
      description: "Complete a full 42km marathon race",
      category: "health",
      type: "long-term",
      targetDate: "2025-09-15",
      progress: 30,
      createdAt: "2024-12-01",
      milestones: [
        { id: 1, text: "Run 5km consistently", completed: true },
        { id: 2, text: "Run 10km", completed: true },
        { id: 3, text: "Run half marathon", completed: false },
        { id: 4, text: "Run 35km", completed: false },
        { id: 5, text: "Complete full marathon", completed: false },
      ],
    },
    {
      id: 4,
      title: "Get Promoted to Senior Developer",
      description:
        "Advance to senior developer position with leadership responsibilities",
      category: "career",
      type: "long-term",
      targetDate: "2025-08-01",
      progress: 55,
      createdAt: "2024-09-20",
      milestones: [
        { id: 1, text: "Complete all current projects", completed: true },
        { id: 2, text: "Lead a team project", completed: true },
        { id: 3, text: "Mentor junior developers", completed: false },
        { id: 4, text: "Present at team meetings", completed: false },
      ],
    },
    {
      id: 5,
      title: "Read 24 Books This Year",
      description: "Read 2 books per month to expand knowledge and skills",
      category: "personal",
      type: "short-term",
      targetDate: "2025-12-31",
      progress: 75,
      createdAt: "2025-01-01",
      milestones: [
        { id: 1, text: "Read 6 books (Q1)", completed: true },
        { id: 2, text: "Read 12 books (Q2)", completed: true },
        { id: 3, text: "Read 18 books (Q3)", completed: true },
        { id: 4, text: "Read 24 books (Q4)", completed: false },
      ],
    },
  ]);

  const categories = [
    { value: "personal", label: "Personal", icon: FaHeart, color: "#5a6945" },
    { value: "career", label: "Career", icon: FaBriefcase, color: "#6b7a54" },
    { value: "health", label: "Health", icon: FaDumbbell, color: "#8a9876" },
    {
      value: "learning",
      label: "Learning",
      icon: FaGraduationCap,
      color: "#a8b89c",
    },
    {
      value: "financial",
      label: "Financial",
      icon: FaDollarSign,
      color: "#556342",
    },
  ];

  const getFilteredGoals = () => {
    if (activeTab === "all") return goals;
    if (activeTab === "short-term" || activeTab === "long-term") {
      return goals.filter((g) => g.type === activeTab);
    }
    return goals.filter((g) => g.category === activeTab);
  };

  const handleAddGoal = () => {
    const goal = {
      id: goals.length + 1,
      ...newGoal,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setGoals([...goals, goal]);
    setShowAddModal(false);
    setNewGoal({
      title: "",
      description: "",
      category: "personal",
      type: "long-term",
      targetDate: "",
      progress: 0,
      milestones: [],
    });
  };

  const handleEditGoal = () => {
    setGoals(goals.map((g) => (g.id === selectedGoal.id ? selectedGoal : g)));
    setShowEditModal(false);
    setSelectedGoal(null);
  };

  const handleDeleteGoal = (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter((g) => g.id !== id));
    }
  };

  const handleProgressChange = (goalId, newProgress) => {
    setGoals(
      goals.map((g) => (g.id === goalId ? { ...g, progress: newProgress } : g))
    );
  };

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          const updatedMilestones = g.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          );
          const completedCount = updatedMilestones.filter(
            (m) => m.completed
          ).length;
          const newProgress = Math.round(
            (completedCount / updatedMilestones.length) * 100
          );
          return { ...g, milestones: updatedMilestones, progress: newProgress };
        }
        return g;
      })
    );
  };

  const getDaysUntilTarget = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGoalStats = () => {
    return {
      total: goals.length,
      shortTerm: goals.filter((g) => g.type === "short-term").length,
      longTerm: goals.filter((g) => g.type === "long-term").length,
      avgProgress: Math.round(
        goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
      ),
    };
  };

  const stats = getGoalStats();
  const filteredGoals = getFilteredGoals();

  return (
    <div className="goals-page">
      <div className="goals-container">
        {/* Header */}
        <div className="goals-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Back
          </button>
          <div className="header-content">
            <h1>
              <FaTrophy /> My Goals
            </h1>
            <p>Set, track, and achieve your long-term goals</p>
          </div>
          <button
            className="add-goal-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> New Goal
          </button>
        </div>

        {/* Stats Cards */}
        <div className="goals-stats-grid">
          <div className="goal-stat-card total">
            <div className="stat-icon">
              <FaTrophy />
            </div>
            <div className="stat-info">
              <h3>Total Goals</h3>
              <p>{stats.total}</p>
            </div>
          </div>
          <div className="goal-stat-card short">
            <div className="stat-icon">
              <FaFlag />
            </div>
            <div className="stat-info">
              <h3>Short-term</h3>
              <p>{stats.shortTerm}</p>
            </div>
          </div>
          <div className="goal-stat-card long">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-info">
              <h3>Long-term</h3>
              <p>{stats.longTerm}</p>
            </div>
          </div>
          <div className="goal-stat-card progress">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>Avg Progress</h3>
              <p>{stats.avgProgress}%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="goals-tabs">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All Goals
          </button>
          <button
            className={activeTab === "short-term" ? "active" : ""}
            onClick={() => setActiveTab("short-term")}
          >
            Short-term
          </button>
          <button
            className={activeTab === "long-term" ? "active" : ""}
            onClick={() => setActiveTab("long-term")}
          >
            Long-term
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={activeTab === cat.value ? "active" : ""}
              onClick={() => setActiveTab(cat.value)}
            >
              <cat.icon /> {cat.label}
            </button>
          ))}
        </div>

        {/* Goals List */}
        <div className="goals-list">
          {filteredGoals.length === 0 ? (
            <div className="no-goals">
              <FaTrophy />
              <p>No goals found</p>
              <span>Start by creating your first goal!</span>
            </div>
          ) : (
            filteredGoals.map((goal) => {
              const category = categories.find(
                (c) => c.value === goal.category
              );
              const daysRemaining = getDaysUntilTarget(goal.targetDate);
              const isExpanded = expandedGoal === goal.id;

              return (
                <div key={goal.id} className="goal-card">
                  <div className="goal-card-header">
                    <div
                      className="goal-icon"
                      style={{ background: category.color }}
                    >
                      <category.icon />
                    </div>
                    <div className="goal-main">
                      <div className="goal-title-row">
                        <h3>{goal.title}</h3>
                        <span className={`goal-type ${goal.type}`}>
                          {goal.type === "short-term" ? <FaFlag /> : <FaStar />}
                          {goal.type.replace("-", " ")}
                        </span>
                      </div>
                      <p>{goal.description}</p>
                    </div>
                    <div className="goal-actions">
                      <button
                        onClick={() => {
                          setSelectedGoal(goal);
                          setShowEditModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteGoal(goal.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="goal-progress-section">
                    <div className="progress-header">
                      <span className="progress-label">Progress</span>
                      <span className="progress-percentage">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${goal.progress}%`,
                          background:
                            goal.progress >= 75
                              ? "#10b981"
                              : goal.progress >= 50
                              ? "#f59e0b"
                              : "#6b7a54",
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) =>
                        handleProgressChange(goal.id, parseInt(e.target.value))
                      }
                      className="progress-slider"
                    />
                  </div>

                  <div className="goal-card-footer">
                    <div className="goal-meta">
                      <span className="goal-date">
                        <FaCalendarAlt />
                        {daysRemaining < 0
                          ? `Overdue by ${Math.abs(daysRemaining)} days`
                          : daysRemaining === 0
                          ? "Due today"
                          : `${daysRemaining} days remaining`}
                      </span>
                      <span
                        className="category-badge"
                        style={{ background: category.color }}
                      >
                        <category.icon /> {category.label}
                      </span>
                    </div>
                    {goal.milestones && goal.milestones.length > 0 && (
                      <button
                        className="toggle-milestones-btn"
                        onClick={() =>
                          setExpandedGoal(isExpanded ? null : goal.id)
                        }
                      >
                        {isExpanded ? "Hide" : "Show"} Milestones (
                        {goal.milestones.filter((m) => m.completed).length}/
                        {goal.milestones.length})
                      </button>
                    )}
                  </div>

                  {isExpanded && goal.milestones && (
                    <div className="milestones-section">
                      <h4>
                        <FaCheckCircle /> Milestones
                      </h4>
                      <div className="milestones-list">
                        {goal.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className={`milestone-item ${
                              milestone.completed ? "completed" : ""
                            }`}
                            onClick={() =>
                              toggleMilestone(goal.id, milestone.id)
                            }
                          >
                            {milestone.completed ? (
                              <FaCheckCircle />
                            ) : (
                              <FaCircle />
                            )}
                            <span>{milestone.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaPlus /> Create New Goal
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Goal Title *</label>
                <input
                  type="text"
                  placeholder="Enter your goal"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe your goal in detail"
                  rows="4"
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, category: e.target.value })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newGoal.type}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, type: e.target.value })
                    }
                  >
                    <option value="short-term">Short-term</option>
                    <option value="long-term">Long-term</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Target Date *</label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetDate: e.target.value })
                  }
                />
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
                onClick={handleAddGoal}
                disabled={!newGoal.title || !newGoal.targetDate}
              >
                <FaSave /> Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Goal Modal */}
      {showEditModal && selectedGoal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaEdit /> Edit Goal
              </h2>
              <button onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Goal Title *</label>
                <input
                  type="text"
                  value={selectedGoal.title}
                  onChange={(e) =>
                    setSelectedGoal({ ...selectedGoal, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={selectedGoal.description}
                  onChange={(e) =>
                    setSelectedGoal({
                      ...selectedGoal,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={selectedGoal.category}
                    onChange={(e) =>
                      setSelectedGoal({
                        ...selectedGoal,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={selectedGoal.type}
                    onChange={(e) =>
                      setSelectedGoal({ ...selectedGoal, type: e.target.value })
                    }
                  >
                    <option value="short-term">Short-term</option>
                    <option value="long-term">Long-term</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Target Date *</label>
                <input
                  type="date"
                  value={selectedGoal.targetDate}
                  onChange={(e) =>
                    setSelectedGoal({
                      ...selectedGoal,
                      targetDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Progress: {selectedGoal.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedGoal.progress}
                  onChange={(e) =>
                    setSelectedGoal({
                      ...selectedGoal,
                      progress: parseInt(e.target.value),
                    })
                  }
                  className="progress-slider"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleEditGoal}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
