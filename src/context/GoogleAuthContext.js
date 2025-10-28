import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { parseTaskText } from "../services/nlpService";
import { useGoals } from "./GoalsContext";

const GoogleAuthContext = createContext(null);

export const GoogleAuthProvider = ({ children }) => {
  const [googleAuth, setGoogleAuth] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [error, setError] = useState(null);
  const [nlpSuggestions, setNlpSuggestions] = useState(null);
  const { user } = useAuth();
  const { goals } = useGoals();

  const fetchCalendarEvents = useCallback(async () => {
    const token = localStorage.getItem(`googleToken_${user?.id}`);
    if (!token) return;

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setCalendarEvents(data.items || []);
  }, [user?.id]);

  const handleAuthResponse = useCallback(
    async (response) => {
      if (response.access_token) {
        localStorage.setItem(`googleToken_${user?.id}`, response.access_token);
        await fetchCalendarEvents();
      }
    },
    [user?.id, fetchCalendarEvents]
  );

  const initGoogleAuth = useCallback(async () => {
    if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
      setError("Google Client ID is not configured");
      return;
    }

    try {
      if (!window.google?.accounts?.oauth2) {
        setError("Google API not loaded");
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.readonly",
        callback: handleAuthResponse,
      });
      setGoogleAuth(client);
      setError(null);
    } catch (err) {
      setError(`Failed to initialize Google Auth: ${err.message}`);
    }
  }, [handleAuthResponse]);

  useEffect(() => {
    if (user) {
      initGoogleAuth();
    }
  }, [user, initGoogleAuth]);

  useEffect(() => {
    if (user) {
      fetchCalendarEvents();
    } else {
      setCalendarEvents([]);
    }
  }, [user, fetchCalendarEvents]);

  const [userState, setUserState] = useState({
    energyLevel: "medium",
    location: "home",
    availableTime: 30, // minutes
  });

  const findAvailableTimeSlots = useCallback(() => {
    if (!calendarEvents.length) return [];

    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const busySlots = calendarEvents
      .filter((event) => new Date(event.start.dateTime) > now)
      .map((event) => ({
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
      }));

    return busySlots;
  }, [calendarEvents]);

  const analyzeCurrentContext = useCallback(() => {
    const availableSlots = findAvailableTimeSlots();
    const activeGoals = goals.filter(
      (goal) => goal.startDate <= Date.now() && goal.endDate >= Date.now()
    );

    return {
      currentTime: new Date(),
      availableSlots,
      userContext: userState,
      activeGoals,
    };
  }, [findAvailableTimeSlots, userState, goals]);

  const processTaskText = useCallback((text) => {
    const existingProjects = []; // This should come from your project context
    const parsed = parseTaskText(text, existingProjects);
    setNlpSuggestions(parsed);
    return parsed;
  }, []);

  return (
    <GoogleAuthContext.Provider
      value={{
        googleAuth,
        calendarEvents,
        initGoogleAuth,
        fetchCalendarEvents,
        error,
        userState,
        setUserState,
        analyzeCurrentContext,
        nlpSuggestions,
        processTaskText,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
