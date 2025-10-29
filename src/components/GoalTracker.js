import React, { useState } from "react";
import { computePredictiveTimeline } from "../utils/predictive";
import { useGoals } from "../context/GoalsContext";

const GoalTracker = ({ tasks = [] }) => {
  const { goals, setGoals } = useGoals();
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleAddGoal = (e) => {
    e.preventDefault();
    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: "", description: "", deadline: "" });
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter((g) => g.id !== goalId));
  };

  // Helper: filter tasks that reference this goal
  const tasksForGoal = (goalId) => tasks.filter((t) => t.goalId === goalId);

  const renderProgressBar = (report) => {
    const percent =
      report.total > 0 ? (report.completed / report.total) * 100 : 0;

    return (
      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: "#eee",
          borderRadius: "4px",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor: report.status === "behind" ? "#ff9800" : "#4caf50",
            borderRadius: "4px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    );
  };

  const renderGoalRow = (goal) => {
    const related = tasksForGoal(goal.id);
    const report = computePredictiveTimeline(goal, related);

    const predictedStr = report.predictedCompletionDate
      ? report.predictedCompletionDate.toDateString()
      : "Unknown";
    const deadlineStr = report.goalDeadline
      ? report.goalDeadline.toDateString()
      : "No deadline";

    let alert = "";
    if (report.status === "behind") {
      alert = `You are ${report.deltaDays} day(s) behind on this goal. Consider rescheduling or prioritizing ${report.remaining} task(s).`;
    } else if (report.status === "ahead") {
      alert = `Good progress — predicted to finish ${-report.deltaDays} day(s) before the deadline.`;
    } else if (report.status === "on-track") {
      alert = "On track to meet the deadline.";
    } else if (report.status === "no-deadline") {
      alert =
        "No deadline set for this goal. Predicted finish: " + predictedStr;
    } else {
      alert = "Insufficient data to predict timeline.";
    }

    return (
      <div
        key={goal.id}
        className="goal-row"
        style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{goal.title}</strong>
            <div style={{ fontSize: 13, color: "#666" }}>
              {goal.description || ""}
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 13 }}>
            <div>Tasks: {report.total}</div>
            <div>Completed: {report.completed}</div>
            <div>Remaining: {report.remaining}</div>
          </div>
        </div>

        <div style={{ marginTop: 8, fontSize: 13 }}>
          <div>Deadline: {deadlineStr}</div>
          <div>Predicted completion: {predictedStr}</div>
          {renderProgressBar(report)}
          <div
            style={{
              marginTop: 6,
              color: report.status === "behind" ? "#b71c1c" : "#155724",
            }}
          >
            {alert}
          </div>

          {report.status === "behind" && report.remaining > 0 && (
            <div style={{ marginTop: 8, color: "#ff9800" }}>
              Suggestion: Consider rescheduling{" "}
              {Math.ceil(report.remaining / 2)} tasks to get back on track
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!goals.length) {
    return (
      <div>
        <h2>Goals</h2>
        <p>No goals created yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Goals</h2>
      <form onSubmit={handleAddGoal} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Goal Title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newGoal.description}
          onChange={(e) =>
            setNewGoal({ ...newGoal, description: e.target.value })
          }
          style={{ marginRight: 8 }}
        />
        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add Goal</button>
      </form>

      <div style={{ marginTop: 12 }}>
        {goals.map((g) => (
          <div key={g.id}>
            {renderGoalRow(g)}
            <button
              onClick={() => handleDeleteGoal(g.id)}
              style={{ marginTop: 8, color: "#dc3545" }}
            >
              Delete Goal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
