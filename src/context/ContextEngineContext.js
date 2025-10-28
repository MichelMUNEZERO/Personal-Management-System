import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useGoogleAuth } from './GoogleAuthContext';

const ContextEngineContext = createContext(null);

export const ContextEngineProvider = ({ children }) => {
  const { user } = useAuth();
  const { calendarEvents } = useGoogleAuth();

  const getRecommendation = useCallback((tasks) => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Determine current energy level based on time of day
    let predictedEnergy = 'medium';
    if (currentHour >= 9 && currentHour <= 11) predictedEnergy = 'high';
    if (currentHour >= 14 && currentHour <= 15) predictedEnergy = 'low';
    
    // Check calendar availability
    const nextEvent = calendarEvents?.find(event => 
      new Date(event.start.dateTime) > now
    );
    const availableTime = nextEvent 
      ? (new Date(nextEvent.start.dateTime) - now) / (1000 * 60)
      : 240; // default to 4 hours if no next event

    // Filter and score tasks
    return tasks
      .filter(task => !task.completed)
      .map(task => ({
        ...task,
        score: calculateTaskScore(task, {
          energy: predictedEnergy,
          availableTime,
          currentHour
        })
      }))
      .sort((a, b) => b.score - a.score)[0];
  }, [calendarEvents]);

  const calculateTaskScore = (task, context) => {
    let score = 0;
    
    // Priority score
    if (task.priority === 'high') score += 5;
    if (task.priority === 'medium') score += 3;
    
    // Energy match score
    if (task.energyLevel === context.energy) score += 3;
    
    // Time fit score
    const timeMap = { quick: 15, medium: 30, long: 60 };
    if (timeMap[task.timeRequired] <= context.availableTime) score += 4;
    
    // Location context score
    if (task.location === 'anywhere' || 
        (context.currentHour >= 9 && context.currentHour <= 17 && task.location === 'office') ||
        (context.currentHour < 9 || context.currentHour > 17 && task.location === 'home')) {
      score += 2;
    }

    return score;
  };

  return (
    <ContextEngineContext.Provider value={{ getRecommendation }}>
      {children}
    </ContextEngineContext.Provider>
  );
};

export const useContextEngine = () => useContext(ContextEngineContext);
