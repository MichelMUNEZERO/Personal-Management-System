// components/CalendarView.js
import React, { useState } from "react";

const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const getTasksForDate = (day) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toDateString();
    return tasks.filter(
      (task) => new Date(task.dueDate).toDateString() === dateStr
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = getTasksForDate(day);
      days.push(
        <div key={day} className="calendar-day">
          <span className="day-number">{day}</span>
          {dayTasks.map((task) => (
            <div
              key={task.id}
              className={`calendar-task ${task.priority}`}
              title={task.title}
            >
              {task.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)}>← Previous</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={() => navigateMonth(1)}>Next →</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarView;
