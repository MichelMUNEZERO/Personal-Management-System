// App.js
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager";
import NotesManager from "./components/NotesManager";
import CalendarView from "./components/CalendarView";
import GoalTracker from "./components/GoalTracker";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { InboxProvider } from "./context/InboxContext";
import { LinkProvider } from "./context/LinkContext";
import CaptureWidget from "./components/capture/CaptureWidget";
import Inbox from "./components/inbox/Inbox";
import { GoogleAuthProvider } from "./context/GoogleAuthContext";
import { GoalsProvider } from "./context/GoalsContext";

function App() {
  const [scriptRef, setScriptRef] = useState(null);

  const initializeGoogleAuth = useCallback(() => {
    // Google Auth initialization logic here
  }, []);

  const loadGoogleScript = useCallback(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://accounts.google.com/gsi/client";
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.onload = initializeGoogleAuth;
    setScriptRef(scriptElement);
    document.body.appendChild(scriptElement);
  }, [initializeGoogleAuth]);

  useEffect(() => {
    loadGoogleScript();
    return () => {
      if (scriptRef) {
        document.body.removeChild(scriptRef);
      }
    };
  }, [loadGoogleScript, scriptRef]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [goals, setGoals] = useState([]);
  const { user, loading, logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard tasks={tasks} notes={notes} goals={goals} />;
      case "tasks":
        return <TaskManager tasks={tasks} setTasks={setTasks} />;
      case "notes":
        return <NotesManager notes={notes} setNotes={setNotes} />;
      case "calendar":
        return <CalendarView tasks={tasks} />;
      case "goals":
        return <GoalTracker goals={goals} setGoals={setGoals} />;
      case "inbox":
        return <Inbox />;
      default:
        return <Dashboard tasks={tasks} notes={notes} goals={goals} />;
    }
  };

  useEffect(() => {
    console.log('Auth state:', { user, loading });
  }, [user, loading]);

  if (loading) {
    console.log('Loading state...');
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    console.log('No user found, showing login...');
    return <Login />;
  }

  console.log('Rendering main app with activeTab:', activeTab);
  
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>Personal Management System</h1>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        <nav className="nav-tabs">
          {["inbox", "dashboard", "tasks", "notes", "calendar", "goals"].map(
            (tab) => (
              <button
                key={tab}
                className={`nav-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </nav>
      </header>

      <main className="app-main">{renderContent()}</main>
      <CaptureWidget />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <GoogleAuthProvider>
        <GoalsProvider>
          <LinkProvider>
            <InboxProvider>
              <App />
            </InboxProvider>
          </LinkProvider>
        </GoalsProvider>
      </GoogleAuthProvider>
    </AuthProvider>
  );
}
