export function computePredictiveTimeline(goal, tasksForGoal) {
  // tasksForGoal: array of tasks that belong to the goal.
  // Task expected fields (best-effort): { completed: boolean, completedAt: ISO, createdAt: ISO, deadline: ISO }
  const now = new Date();
  const total = tasksForGoal.length;
  const completedTasks = tasksForGoal.filter((t) => t.completed).length;
  const remaining = Math.max(0, total - completedTasks);

  // Determine pace (tasks/day) using completedAt timestamps if available
  const completedWithDates = tasksForGoal
    .filter((t) => t.completed && t.completedAt)
    .map((t) => new Date(t.completedAt))
    .sort((a, b) => a - b);

  let pacePerDay = 0;

  if (completedWithDates.length >= 2) {
    const first = completedWithDates[0];
    const last = completedWithDates[completedWithDates.length - 1];
    const days = Math.max(1, (last - first) / (1000 * 60 * 60 * 24));
    pacePerDay = completedWithDates.length / days;
  } else if (completedWithDates.length === 1) {
    // Only one completed with timestamp -> assume small positive pace
    pacePerDay = 0.2; // ~1 task every 5 days as a conservative default
  } else if (completedTasks > 0) {
    // completed tasks exist but no timestamps -> estimate using an assumed period
    pacePerDay = Math.max(0.05, completedTasks / 14); // spread over two weeks
  } else {
    // no progress -> assume minimal pace
    pacePerDay = 0.05; // very slow default
  }

  // Estimate days to finish remaining tasks
  const daysToFinish = pacePerDay > 0 ? remaining / pacePerDay : Infinity;
  const predictedCompletionDate = isFinite(daysToFinish)
    ? new Date(now.getTime() + daysToFinish * 24 * 60 * 60 * 1000)
    : null;

  // Goal deadline (if provided)
  const goalDeadline = goal.deadline ? new Date(goal.deadline) : null;

  let status = "no-deadline";
  let deltaDays = null;

  if (predictedCompletionDate && goalDeadline) {
    // positive if predicted is later than deadline (i.e., behind), negative if earlier (ahead)
    deltaDays = Math.round(
      (predictedCompletionDate - goalDeadline) / (1000 * 60 * 60 * 24)
    );
    if (deltaDays > 0) status = "behind";
    else if (deltaDays < 0) status = "ahead";
    else status = "on-track";
  } else if (predictedCompletionDate && !goalDeadline) {
    status = "no-deadline";
  } else {
    status = "unknown";
  }

  return {
    total,
    completed: completedTasks,
    remaining,
    pacePerDay,
    daysToFinish: isFinite(daysToFinish) ? Math.round(daysToFinish) : null,
    predictedCompletionDate,
    goalDeadline,
    status,
    deltaDays,
  };
}
