import React, { useState } from "react";

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        text: newGoal,
        progress: 0,
        target: 100,
      },
    ]);
    setNewGoal("");
  };

  const updateProgress = (id, increment) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === id) {
          const newProgress = Math.max(
            0,
            Math.min(100, goal.progress + increment)
          );
          return { ...goal, progress: newProgress };
        }
        return goal;
      })
    );
  };

  return (
    <div className="goal-tracker">
      <form className="goal-input" onSubmit={addGoal}>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal"
        />
        <button type="submit">Add Goal</button>
      </form>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-item">
          <div className="goal-header">
            <h3>{goal.text}</h3>
          </div>
          <div className="goal-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            <span>{goal.progress}%</span>
          </div>
          <div className="goal-controls">
            <button onClick={() => updateProgress(goal.id, -10)}>-</button>
            <button onClick={() => updateProgress(goal.id, 10)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalTracker;
