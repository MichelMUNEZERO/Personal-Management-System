import React, { useState } from "react";
import "./LandingPages.css";
import DailyFlow from "../assets/DailyFlowLogo.jpg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcParallelTasks } from "react-icons/fc";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineTimer10Select } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";

export default function LandingPages() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <header>
        <div className="container header-container">
          <a href="#" className="logo">
            <img src={DailyFlow} alt="DailyFlow Manager Logo" />
          </a>

          <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            <a href="#home" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="#features" onClick={closeMobileMenu}>
              Features
            </a>
            <a href="#about" onClick={closeMobileMenu}>
              About
            </a>
            <button
              href="./Auth/login"
              className="cta-button"
              onClick={closeMobileMenu}
            >
              Sign In
            </button>
            <button
              href="./Auth/signup"
              className="cta-button"
              onClick={closeMobileMenu}
            >
              Sign Up
            </button>
          </nav>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <CgMenuGridO />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Master Your Time with <span>DailyFlow Manager</span>
            </h1>
            <p>
              DailyFlow Manager combines the proven Pomodoro technique with
              intelligent task management to boost your productivity, reduce
              procrastination, and help you achieve more in less time.
            </p>

            <div className="hero-buttons">
              <a href="#dashboard" className="cta-button">
                <i className="fas fa-rocket"></i> Start for Free
              </a>
              <a href="#features" className="secondary-button">
                <i className="fas fa-play-circle"></i> See Features
              </a>
            </div>

            <div className="hero-stats">
              <p>
                <i
                  className="fas fa-check-circle"
                  style={{ color: "var(--secondary)" }}
                ></i>{" "}
                10,000+ productive users
              </p>
              <p>
                <i
                  className="fas fa-check-circle"
                  style={{ color: "var(--secondary)" }}
                ></i>{" "}
                2.5M+ tasks completed
              </p>
              <p>
                <i
                  className="fas fa-check-circle"
                  style={{ color: "var(--secondary)" }}
                ></i>{" "}
                98% user satisfaction
              </p>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Dashboard Preview"
              className="dashboard-preview"
            />

            <div className="floating-element">
              <div className="floating-icon timer-icon">
                <i className="fas fa-hourglass-half"></i>
              </div>
              <div>
                <strong>Smart Timer</strong>
                <p>25 min focus</p>
              </div>
            </div>

            <div className="floating-element">
              <div className="floating-icon task-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <div>
                <strong>Task Completed</strong>
                <p>Daily goal: 8/10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
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
                <MdOutlineTimer10Select size={40} />
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

      {/* About Section */}
      <section className="about" id="about">
        <div className="container about-container">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Productivity Tools"
            />
          </div>

          <div className="about-content">
            <h2>Why Choose DailyFlow Manager?</h2>
            <p>
              DailyFlow Manager was created to solve a common problem: how to
              stay productive in a world full of distractions. We combine
              time-tested techniques with modern technology to help you take
              control of your time.
            </p>

            <p>
              Our platform is built on the principles of the Pomodoro Technique,
              developed by Francesco Cirillo in the late 1980s. This method uses
              a timer to break work into intervals, traditionally 25 minutes in
              length, separated by short breaks.
            </p>

            <p>
              But we've taken it further by integrating task management,
              analytics, and personalized insights to create a complete
              productivity system that adapts to your workflow.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">94%</span>
                <span className="stat-label">Report Increased Focus</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3.2x</span>
                <span className="stat-label">More Tasks Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">40%</span>
                <span className="stat-label">Time Saved Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-container">
          <div className="footer-column">
            <h3>DailyFlow Manager</h3>
            <p>
              Your personal productivity companion. Master your time, accomplish
              more, and reduce stress with intelligent time management tools.
            </p>
            <div className="social-links">
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <AiFillTikTok />
              </a>
              <a href="#">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#dashboard">Dashboard</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Pomodoro Guide</a>
              </li>
              <li>
                <a href="#">Productivity Tips</a>
              </li>
              <li>
                <a href="#">Time Management</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-envelope"></i> dailyflowmanager@gmail.com
              </li>
              <li>
                <i className="fas fa-phone"></i> +250 791 268 906
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> 123 Productivity St,
                Work City
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="footer-bottom">
            <p>
              &copy; 2023 DailyFlow Manager. All rights reserved. | Designed
              with <i className="fas fa-heart" style={{ color: "#e74c3c" }}></i>{" "}
              for productive minds
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
