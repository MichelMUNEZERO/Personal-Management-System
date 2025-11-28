import { useState } from "react";
import AuthPage from "./component/AuthPage";
import UserDashboard from "./component/UserDashboard";

import "./App.css";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Morning Run",
      category: "exercise",
      startTime: new Date(new Date().setHours(7, 0, 0)),
      endTime: new Date(new Date().setHours(7, 45, 0)),
      notes: "",
    },
    {
      id: 2,
      name: "Project Planning",
      category: "work",
      startTime: new Date(new Date().setHours(9, 0, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0)),
      notes: "",
    },
  ]);

  const handleAddActivity = (activity) => {
    setActivities((prev) => [activity, ...prev]);
  };

  const handleAuthenticate = (profile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthMode("login");
  };

  return (
    <div className="app-shell">
      {user ? (
        <UserDashboard
          user={user}
          activities={activities}
          onAddActivity={handleAddActivity}
          onLogout={handleLogout}
        />
      ) : (
        <AuthPage
          mode={authMode}
          onToggleMode={setAuthMode}
          onAuthenticate={handleAuthenticate}
        />
      )}
    </div>
  );
}

export default App;
