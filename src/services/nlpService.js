const extractDateFromText = (text) => {
  const dateKeywords = {
    today: () => new Date(),
    tomorrow: () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    },
    "next friday": () => {
      const date = new Date();
      date.setDate(date.getDate() + ((7 - date.getDay() + 5) % 7 || 7));
      return date;
    },
  };

  for (const [keyword, handler] of Object.entries(dateKeywords)) {
    if (text.toLowerCase().includes(keyword)) {
      return handler();
    }
  }
  return null;
};

export const parseTaskText = (text, existingProjects = []) => {
  // Extract date
  const dueDate = extractDateFromText(text);

  // Remove date reference from text
  let cleanText = text.replace(/by\s+(today|tomorrow|next\s+\w+)/gi, "").trim();

  // Find potential project references
  const projectSuggestions = existingProjects.filter((project) =>
    text.toLowerCase().includes(project.name.toLowerCase())
  );

  // Basic action/subject extraction
  const actionMatch = cleanText.match(/^(\w+)\s/);
  const action = actionMatch ? actionMatch[1] : "";

  return {
    taskTitle: cleanText,
    dueDate,
    action,
    suggestedProjects: projectSuggestions,
    originalText: text,
  };
};
