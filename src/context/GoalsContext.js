import React, { createContext, useContext, useState } from "react";

const GoalsContext = createContext(null);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const value = {
    goals,
    setGoals,
  };

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};
