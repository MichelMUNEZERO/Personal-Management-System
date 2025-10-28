export const matchTaskToContext = (task, userContext) => {
  let score = 0;

  // Match energy level
  if (task.energy_level === userContext.energyLevel) {
    score += 3;
  }

  // Match location
  if (task.location === userContext.location) {
    score += 2;
  }

  // Match available time
  if (task.time_required <= userContext.availableTime) {
    score += 2;
  }

  // Consider priority
  score += task.priority * 2;

  return score;
};

export const recommendTask = (tasks, context) => {
  if (!tasks.length) return null;

  return tasks
    .map((task) => ({
      task,
      score: matchTaskToContext(task, context.userContext),
    }))
    .sort((a, b) => b.score - a.score)[0].task;
};
