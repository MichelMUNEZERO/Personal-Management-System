import React from "react";
import "./Header.css";
import logo from "../assets/DailyFlowLogo.jpg";

export default function Header() {
  return (
    <div>
      <header>
        <div className="logo-div">
          <a href="#" className="logo">
            <img src={logo} alt="DailyFlow Logo" className="logo-img" />
            <div className="logo-text">
              Daily<span>Flow</span>
            </div>
          </a>
          <nav className="nav-links">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </nav>

          <div className="auth-buttons">
            <button className="button-sign-in">Sign In</button>
            <button className="button-sign-up">Sign Up</button>
          </div>
        </div>
      </header>
    </div>
  );
}
