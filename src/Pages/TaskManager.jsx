import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaTasks,
  FaCheckCircle,
  FaCircle,
  FaClock,
  FaFlag,
  FaTimes,
  FaSave,
  FaSort,
  FaCalendarAlt,
  FaEllipsisV,
} from "react-icons/fa";
import "./TaskManager.css";

export default function TaskManager() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "work",
    priority: "medium",
    dueDate: "",
    status: "pending",
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      description:
        "Finish the Q1 project proposal and send it to the team for review",
      category: "work",
      priority: "high",
      dueDate: "2025-01-05",
      status: "in-progress",
      createdAt: "2024-12-28",
    },
    {
      id: 2,
      title: "Review design mockups",
      description: "Go through the new UI designs and provide feedback",
      category: "work",
      priority: "medium",
      dueDate: "2025-01-03",
      status: "pending",
      createdAt: "2024-12-29",
    },
    {
      id: 3,
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      category: "work",
      priority: "low",
      dueDate: "2025-01-10",
      status: "pending",
      createdAt: "2024-12-30",
    },
    {
      id: 4,
      title: "Gym workout",
      description: "Complete upper body workout routine",
      category: "personal",
      priority: "medium",
      dueDate: "2025-01-01",
      status: "completed",
      createdAt: "2024-12-27",
    },
    {
      id: 5,
      title: "Read React documentation",
      description: "Study new React 19 features and best practices",
      category: "learning",
      priority: "high",
      dueDate: "2025-01-07",
      status: "in-progress",
      createdAt: "2024-12-26",
    },
    {
      id: 6,
      title: "Team meeting preparation",
      description: "Prepare slides for weekly team sync",
      category: "work",
      priority: "high",
      dueDate: "2025-01-02",
      status: "pending",
      createdAt: "2024-12-30",
    },
  ]);

  const categories = [
    { value: "work", label: "Work", color: "#5a6945" },
    { value: "personal", label: "Personal", color: "#6b7a54" },
    { value: "learning", label: "Learning", color: "#8a9876" },
    { value: "health", label: "Health", color: "#a8b89c" },
  ];

  const priorities = [
    { value: "high", label: "High", color: "#ef4444" },
    { value: "medium", label: "Medium", color: "#f59e0b" },
    { value: "low", label: "Low", color: "#10b981" },
  ];

  const statuses = [
    { value: "pending", label: "Pending", icon: FaCircle },
    { value: "in-progress", label: "In Progress", icon: FaClock },
    { value: "completed", label: "Completed", icon: FaCheckCircle },
  ];

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    let filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || task.status === filterStatus;
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;
      const matchesCategory =
        filterCategory === "all" || task.category === filterCategory;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "status":
          const statusOrder = { pending: 0, "in-progress": 1, completed: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleAddTask = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks([...tasks, task]);
    setShowAddModal(false);
    setNewTask({
      title: "",
      description: "",
      category: "work",
      priority: "medium",
      dueDate: "",
      status: "pending",
    });
  };

  const handleEditTask = () => {
    setTasks(tasks.map((t) => (t.id === selectedTask.id ? selectedTask : t)));
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    };
  };

  const stats = getTaskStats();
  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="task-manager-page">
      <div className="task-manager-container">
        {/* Header */}
        <div className="task-manager-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Back
          </button>
          <div className="header-content">
            <h1>
              <FaTasks /> Task Manager
            </h1>
            <p>Manage and organize all your tasks in one place</p>
          </div>
          <button
            className="add-task-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="task-stats-grid">
          <div className="task-stat-card total">
            <div className="stat-icon">
              <FaTasks />
            </div>
            <div className="stat-info">
              <h3>Total Tasks</h3>
              <p>{stats.total}</p>
            </div>
          </div>
          <div className="task-stat-card pending">
            <div className="stat-icon">
              <FaCircle />
            </div>
            <div className="stat-info">
              <h3>Pending</h3>
              <p>{stats.pending}</p>
            </div>
          </div>
          <div className="task-stat-card progress">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>In Progress</h3>
              <p>{stats.inProgress}</p>
            </div>
          </div>
          <div className="task-stat-card completed">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>Completed</h3>
              <p>{stats.completed}</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="task-controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>

          <div className="sort-dropdown">
            <FaSort />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Status</label>
              <div className="filter-buttons">
                <button
                  className={filterStatus === "all" ? "active" : ""}
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </button>
                {statuses.map((status) => (
                  <button
                    key={status.value}
                    className={filterStatus === status.value ? "active" : ""}
                    onClick={() => setFilterStatus(status.value)}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Priority</label>
              <div className="filter-buttons">
                <button
                  className={filterPriority === "all" ? "active" : ""}
                  onClick={() => setFilterPriority("all")}
                >
                  All
                </button>
                {priorities.map((priority) => (
                  <button
                    key={priority.value}
                    className={
                      filterPriority === priority.value ? "active" : ""
                    }
                    onClick={() => setFilterPriority(priority.value)}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <div className="filter-buttons">
                <button
                  className={filterCategory === "all" ? "active" : ""}
                  onClick={() => setFilterCategory("all")}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.value}
                    className={
                      filterCategory === category.value ? "active" : ""
                    }
                    onClick={() => setFilterCategory(category.value)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="no-tasks">
              <FaTasks />
              <p>No tasks found</p>
              <span>Try adjusting your filters or create a new task</span>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const daysUntilDue = getDaysUntilDue(task.dueDate);
              const category = categories.find(
                (c) => c.value === task.category
              );
              const priority = priorities.find(
                (p) => p.value === task.priority
              );
              const StatusIcon = statuses.find(
                (s) => s.value === task.status
              ).icon;

              return (
                <div key={task.id} className={`task-card ${task.status}`}>
                  <div className="task-card-header">
                    <div className="task-status-icon">
                      <StatusIcon
                        onClick={() => {
                          const nextStatus =
                            task.status === "pending"
                              ? "in-progress"
                              : task.status === "in-progress"
                              ? "completed"
                              : "pending";
                          handleStatusChange(task.id, nextStatus);
                        }}
                      />
                    </div>
                    <div className="task-main-content">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowEditModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteTask(task.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="task-card-footer">
                    <div className="task-meta">
                      <span
                        className="task-category"
                        style={{ background: category.color }}
                      >
                        {category.label}
                      </span>
                      <span
                        className="task-priority"
                        style={{ background: priority.color }}
                      >
                        <FaFlag /> {priority.label}
                      </span>
                    </div>
                    <div className="task-due-date">
                      <FaCalendarAlt />
                      <span
                        className={
                          daysUntilDue < 0
                            ? "overdue"
                            : daysUntilDue <= 2
                            ? "urgent"
                            : ""
                        }
                      >
                        {daysUntilDue < 0
                          ? `Overdue by ${Math.abs(daysUntilDue)} days`
                          : daysUntilDue === 0
                          ? "Due today"
                          : daysUntilDue === 1
                          ? "Due tomorrow"
                          : `Due in ${daysUntilDue} days`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaPlus /> Add New Task
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Enter task description"
                  rows="4"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
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
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                  >
                    {priorities.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
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
                onClick={handleAddTask}
                disabled={!newTask.title || !newTask.dueDate}
              >
                <FaSave /> Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FaEdit /> Edit Task
              </h2>
              <button onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={selectedTask.description}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={selectedTask.category}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
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
                  <label>Priority</label>
                  <select
                    value={selectedTask.priority}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        priority: e.target.value,
                      })
                    }
                  >
                    {priorities.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectedTask.status}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        status: e.target.value,
                      })
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date *</label>
                  <input
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        dueDate: e.target.value,
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
              <button className="btn-save" onClick={handleEditTask}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
