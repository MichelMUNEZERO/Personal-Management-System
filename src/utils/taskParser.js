export const normalizeTaskText = (text) => {
  // Remove multiple spaces
  return text.replace(/\s+/g, " ").trim();
};

export const extractActionVerb = (text) => {
  const commonVerbs = [
    "email",
    "call",
    "write",
    "review",
    "prepare",
    "send",
    "finish",
  ];
  const words = text.toLowerCase().split(" ");
  return commonVerbs.find((verb) => words[0] === verb) || "";
};

export const suggestTaskCategory = (action) => {
  const categoryMap = {
    email: "Communication",
    call: "Communication",
    write: "Documentation",
    review: "Analysis",
    prepare: "Planning",
    send: "Communication",
    finish: "Development",
  };

  return categoryMap[action] || "Other";
};
