// components/TaskManager.js
import React, { useState } from "react";

const TaskManager = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority,
        dueDate,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setPriority("medium");
      setDueDate("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4444";
      case "medium":
        return "#ffaa00";
      case "low":
        return "#44ff44";
      default:
        return "#cccccc";
    }
  };

  return (
    <div className="task-manager">
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="tasks-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-title">{task.title}</span>
              <span
                className="priority-dot"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              ></span>
              {task.dueDate && (
                <span className="due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
