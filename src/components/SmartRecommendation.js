import React from 'react';
import { useContextEngine } from '../context/ContextEngineContext';

function SmartRecommendation({ tasks }) {
  const { getRecommendation } = useContextEngine();
  const recommendedTask = getRecommendation(tasks);

  if (!recommendedTask) return null;

  return (
    <div className="smart-recommendation">
      <h3>Recommended Next Task</h3>
      <div className="recommended-task">
        <h4>{recommendedTask.title}</h4>
        <div className="task-context">
          <span className={`energy-level ${recommendedTask.energyLevel}`}>
            {recommendedTask.energyLevel} Energy
          </span>
          <span className={`time-required ${recommendedTask.timeRequired}`}>
            {recommendedTask.timeRequired}
          </span>
          <span className={`location ${recommendedTask.location}`}>
            {recommendedTask.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SmartRecommendation;
