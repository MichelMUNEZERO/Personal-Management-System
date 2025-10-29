const dateKeywords = {
  'today': 0,
  'tomorrow': 1,
  'next week': 7,
  'next month': 30,
};

export function analyzeText(text) {
  // Extract date
  const datePattern = /by\s+(next\s+\w+|tomorrow|today|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\/\d{1,2})/i;
  const dateMatch = text.match(datePattern);
  let dueDate = null;

  if (dateMatch) {
    const dateText = dateMatch[1].toLowerCase();
    if (dateKeywords.hasOwnProperty(dateText)) {
      const daysToAdd = dateKeywords[dateText];
      dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysToAdd);
    } else if (dateText.match(/\d{1,2}\/\d{1,2}(\/\d{4})?/)) {
      dueDate = new Date(dateText);
    }
  }

  // Extract people (assuming names are capitalized words)
  const peoplePattern = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/g;
  const people = text.match(peoplePattern) || [];

  // Extract main action (first verb or whole text before "by")
  const action = text.split(/\s+by\s+/i)[0].trim();

  // Look for project/goal keywords
  const projectPattern = /(?:for|on|about)\s+(?:the\s+)?([A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(?:project|goal)/i;
  const projectMatch = text.match(projectPattern);
  const suggestedProjects = projectMatch ? [projectMatch[1]] : [];

  return {
    action,
    people: people.filter(p => p.length > 1), // Filter out single letters
    dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
    suggestedProjects,
    fullText: text
  };
}
