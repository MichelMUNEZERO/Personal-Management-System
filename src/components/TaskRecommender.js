import React from "react";
import { useContextEngine } from "../context/ContextEngine";

function TaskRecommender({ tasks }) {
  const { getRecommendedTask, userContext, updateUserContext } =
    useContextEngine();

  const recommendedTask = getRecommendedTask(tasks);

  return (
    <div className="task-recommender">
      <div className="context-settings">
        <h3>Current Context</h3>
        <select
          value={userContext.currentEnergyLevel}
          onChange={(e) =>
            updateUserContext({ currentEnergyLevel: e.target.value })
          }
        >
          <option value="low">Low Energy</option>
          <option value="medium">Medium Energy</option>
          <option value="high">High Energy</option>
        </select>
        <select
          value={userContext.currentLocation}
          onChange={(e) =>
            updateUserContext({ currentLocation: e.target.value })
          }
        >
          <option value="home">At Home</option>
          <option value="office">At Office</option>
          <option value="errands">Running Errands</option>
        </select>
      </div>

      {recommendedTask && (
        <div className="recommendation-card">
          <h3>Recommended Task</h3>
          <div className="task-details">
            <h4>{recommendedTask.title}</h4>
            <p>Energy: {recommendedTask.energyLevel}</p>
            <p>Time: {recommendedTask.timeRequired}</p>
            <p>Location: {recommendedTask.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskRecommender;
