import React, { useState } from "react";
import { analyzeText } from "../../utils/nlp";
import { useGoals } from "../../context/GoalsContext";

const Inbox = () => {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const { goals } = useGoals();

  const handleAnalyze = (e) => {
    e.preventDefault();
    const result = analyzeText(inputText);

    // Find matching goals
    const matchingGoals = goals.filter((goal) =>
      result.suggestedProjects.some((project) =>
        goal.title.toLowerCase().includes(project.toLowerCase())
      )
    );

    setAnalysis({
      ...result,
      suggestedGoals: matchingGoals,
    });
  };

  return (
    <div className="inbox">
      <h2>Quick Capture</h2>
      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter task (e.g., 'Email Sarah about the Project Proposal by next Friday')"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button type="submit">Process</button>
      </form>

      {analysis && (
        <div className="analysis-results" style={{ marginTop: "20px" }}>
          <h3>Extracted Information:</h3>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            <p>
              <strong>Task:</strong> {analysis.action}
            </p>
            {analysis.people.length > 0 && (
              <p>
                <strong>People:</strong> {analysis.people.join(", ")}
              </p>
            )}
            {analysis.dueDate && (
              <p>
                <strong>Due Date:</strong> {analysis.dueDate}
              </p>
            )}
            {analysis.suggestedGoals?.length > 0 && (
              <div>
                <p>
                  <strong>Related Goals:</strong>
                </p>
                <ul>
                  {analysis.suggestedGoals.map((goal) => (
                    <li key={goal.id}>{goal.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
