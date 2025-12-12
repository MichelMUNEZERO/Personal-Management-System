import React from "react";
import "./Hero.css";
import { IoRocketOutline } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import DoIt from "../assets/ToDoIt.avif";
import { LiaHourglassHalfSolid } from "react-icons/lia";
import { SiGoogletasks } from "react-icons/si";

export default function Hero() {
  return (
    <div>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Master Your Time with <span>Pomodoro Power</span>
            </h1>
            <p>
              FocusFlow combines the proven Pomodoro technique with intelligent
              task management to boost your productivity, reduce
              procrastination, and help you achieve more in less time.
            </p>

            <div className="hero-buttons">
              <button className="First-button">
                <IoRocketOutline /> Start for Free
              </button>
              <button className="secondary-button">
                <IoPlayCircleOutline /> See Features
              </button>
            </div>

            <div className="hero-stats">
              <p>
                <FaRegCircleCheck style={{ color: "var(--secondary)" }} />
                10,000+ productive users
              </p>
              <p>
                <FaRegCircleCheck style={{ color: "var(--secondary)" }} /> 2.5M+
                tasks completed 2.5M+ tasks completed
              </p>
              <p>
                <FaRegCircleCheck style={{ color: "var(--secondary)" }} />
                98% user satisfaction
              </p>
            </div>
          </div>

          <div className="hero-image">
            <img
              src={DoIt}
              alt="Dashboard Preview"
              className="dashboard-preview"
            />

            <div className="floating-element">
              <div className="floating-icon timer-icon">
                <LiaHourglassHalfSolid />
              </div>
              <div>
                <strong>Smart Timer</strong>
                <p>25 min focus</p>
              </div>
            </div>

            <div className="floating-element">
              <div className="floating-icon task-icon">
                <SiGoogletasks />
              </div>
              <div>
                <strong>Task Completed</strong>
                <p>Daily goal: 8/10</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
