// components/GoalTracker.js
import React, { useState } from "react";

const GoalTracker = ({ goals, setGoals }) => {
  const [newGoal, setNewGoal] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const addGoal = () => {
    if (newGoal.trim() && targetDate) {
      const goal = {
        id: Date.now(),
        title: newGoal,
        completed: false,
        targetDate,
        createdAt: new Date().toISOString(),
        progress: 0,
      };
      setGoals([...goals, goal]);
      setNewGoal("");
      setTargetDate("");
    }
  };

  const updateProgress = (id, progress) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, progress: Math.min(100, Math.max(0, progress)) }
          : goal
      )
    );
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="goal-tracker">
      <div className="goal-input">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="What do you want to achieve?"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      <div className="goals-list">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`goal-item ${goal.completed ? "completed" : ""}`}
          >
            <div className="goal-header">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
              />
              <span className="goal-title">{goal.title}</span>
              <span className="goal-date">
                Target: {new Date(goal.targetDate).toLocaleDateString()}
              </span>
            </div>

            <div className="goal-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{goal.progress}%</span>
            </div>

            <div className="goal-controls">
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) =>
                  updateProgress(goal.id, parseInt(e.target.value))
                }
              />
              <button
                className="delete-btn"
                onClick={() => deleteGoal(goal.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
