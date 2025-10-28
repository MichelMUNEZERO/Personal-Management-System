export const generateStatusMessage = (analysis) => {
  const { variance, predictedCompletion } = analysis;

  if (variance <= -20) {
    return {
      severity: "high",
      message: `You are significantly behind schedule (${Math.abs(
        Math.round(variance)
      )}% behind). Consider reviewing your timeline or adjusting your tasks.`,
    };
  }

  if (variance < 0) {
    return {
      severity: "medium",
      message: `You are ${Math.abs(
        Math.round(variance)
      )}% behind schedule. You might need to increase your pace.`,
    };
  }

  if (variance > 20) {
    return {
      severity: "low",
      message: `You're ahead of schedule by ${Math.round(
        variance
      )}%! Great progress!`,
    };
  }

  return {
    severity: "low",
    message: `You're on track to complete this goal by ${predictedCompletion.toLocaleDateString()}`,
  };
};

export const calculateMilestones = (goal) => {
  const { tasks, startDate, endDate } = goal;
  const duration = endDate - startDate;

  return tasks.map((task) => ({
    ...task,
    expectedCompletion: new Date(
      startDate + duration * (task.sequenceNumber / tasks.length)
    ),
  }));
};

export const getPaceAnalysis = (goal) => {
  const completedTasks = goal.tasks.filter((t) => t.completed);
  const averageCompletionTime =
    completedTasks.reduce(
      (acc, task) => acc + (task.completedAt - task.startedAt),
      0
    ) / completedTasks.length;

  return {
    averageTaskDuration: averageCompletionTime,
    tasksPerWeek:
      completedTasks.length /
      ((Date.now() - goal.startDate) / (7 * 24 * 60 * 60 * 1000)),
  };
};
