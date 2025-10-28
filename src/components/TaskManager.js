import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority,
        dueDate,
      },
    ]);
    setNewTask("");
  };

  return (
    <div className="task-manager">
      <form className="task-input" onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="tasks-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div className="task-content">
              <div className={`priority-dot ${task.priority}`}></div>
              <span>{task.text}</span>
              <span className="due-date">{task.dueDate}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
