import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const GoogleAuthContext = createContext(null);

export const GoogleAuthProvider = ({ children }) => {
  const [googleAuth, setGoogleAuth] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { user } = useAuth();

  const fetchCalendarEvents = useCallback(async () => {
    const token = localStorage.getItem(`googleToken_${user?.id}`);
    if (!token) return;

    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setCalendarEvents(data.items || []);
  }, [user?.id]);

  const handleAuthResponse = useCallback(async (response) => {
    if (response.access_token) {
      localStorage.setItem(`googleToken_${user?.id}`, response.access_token);
      await fetchCalendarEvents();
    }
  }, [user?.id, fetchCalendarEvents]);

  const initGoogleAuth = useCallback(async () => {
    const client = await window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      callback: handleAuthResponse,
    });
    setGoogleAuth(client);
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

  return (
    <GoogleAuthContext.Provider 
      value={{ 
        googleAuth, 
        calendarEvents, 
        initGoogleAuth, 
        fetchCalendarEvents 
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
