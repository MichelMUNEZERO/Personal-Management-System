import React, { useState } from "react";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        >
          Previous
        </button>
        <h2>
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        >
          Next
        </button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}
        {[...Array(daysInMonth)].map((_, i) => (
          <div key={i} className="calendar-day">
            <div className="day-number">{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
