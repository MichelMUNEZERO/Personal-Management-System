import React, { createContext, useContext, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useGoogleAuth } from "./GoogleAuthContext";

const ContextEngineContext = createContext(null);

export const ENERGY_LEVELS = ["low", "medium", "high"];
export const TIME_REQUIRED = ["quick", "medium", "deep"];
export const LOCATIONS = ["home", "office", "errands"];

export const ContextEngineProvider = ({ children }) => {
  const { user } = useAuth();
  const { calendarEvents } = useGoogleAuth();
  const [userContext, setUserContext] = useState({
    currentEnergyLevel: "medium",
    currentLocation: "home",
  });

  const getRecommendedTask = useCallback(
    (tasks) => {
      const now = new Date();
      const availableTime = getAvailableTimeSlot(calendarEvents, now);

      return (
        tasks
          .filter((task) => !task.completed)
          .sort((a, b) => {
            let score = 0;

            // Priority weight
            score +=
              (getPriorityWeight(b.priority) - getPriorityWeight(a.priority)) *
              3;

            // Energy match weight
            score +=
              getEnergyMatch(b, userContext.currentEnergyLevel) -
              getEnergyMatch(a, userContext.currentEnergyLevel);

            // Time slot match weight
            score +=
              getTimeSlotMatch(b, availableTime) -
              getTimeSlotMatch(a, availableTime);

            // Location match weight
            score +=
              (b.location === userContext.currentLocation ? 1 : 0) -
              (a.location === userContext.currentLocation ? 1 : 0);

            return score;
          })[0] || null
      );
    },
    [calendarEvents, userContext]
  );

  const updateUserContext = (updates) => {
    setUserContext((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ContextEngineContext.Provider
      value={{
        userContext,
        updateUserContext,
        getRecommendedTask,
        ENERGY_LEVELS,
        TIME_REQUIRED,
        LOCATIONS,
      }}
    >
      {children}
    </ContextEngineContext.Provider>
  );
};

export const useContextEngine = () => useContext(ContextEngineContext);
