// App.js
import React, { useState, useEffect } from "react";
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

function AppContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [goals, setGoals] = useState([]);
  const { user, loading, logout } = useAuth();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("personalManagerTasks");
    const savedNotes = localStorage.getItem("personalManagerNotes");
    const savedGoals = localStorage.getItem("personalManagerGoals");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedNotes) setTasks(JSON.parse(savedNotes));
    if (savedGoals) setTasks(JSON.parse(savedGoals));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("personalManagerTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("personalManagerNotes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("personalManagerGoals", JSON.stringify(goals));
  }, [goals]);

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

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

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <AuthProvider>
      <GoogleAuthProvider>
        <LinkProvider>
          <InboxProvider>
            <AppContent />
          </InboxProvider>
        </LinkProvider>
      </GoogleAuthProvider>
    </AuthProvider>
  );
}

export default App;
