import { useState } from "react";
import Navigation from "./component/Navigation";
import Home from "./component/Home";
import Header from "./component/Header";
import ActivityForm from "./component/ActivityForm";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
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
    setActivities([activity, ...activities]);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === "home" ? (
        <Home onNavigate={handleNavigate} />
      ) : (
        <>
          <Header />
          <ActivityForm
            onAddActivity={handleAddActivity}
            activities={activities}
          />
        </>
      )}
    </div>
  );
}

export default App;
