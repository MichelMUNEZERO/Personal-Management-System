import React from "react";
import "./Features.css";
import { LuAlarmClockCheck } from "react-icons/lu";
import { FcParallelTasks } from "react-icons/fc";
import { FaChartLine } from "react-icons/fa";

export default function Features() {
  return (
    <section className="features">
      <div className="container-features">
        <div className="section-title">
          <h2>Powerful Features for Maximum Productivity</h2>
          <p>
            Everything you need to manage your time effectively and accomplish
            more every day
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <LuAlarmClockCheck size={40} />
            </div>
            <h3>Pomodoro Timer</h3>
            <p>
              Customizable work/break intervals based on the proven Pomodoro
              technique to maintain focus and prevent burnout.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FcParallelTasks size={40} />
            </div>
            <h3>Smart Task Management</h3>
            <p>
              Organize tasks with priority levels, due dates, and categories.
              Track progress with visual indicators and completion stats.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine size={40} />
            </div>
            <h3>Productivity Analytics</h3>
            <p>
              Detailed insights into your work patterns, productivity trends,
              and time allocation to help you optimize your workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
