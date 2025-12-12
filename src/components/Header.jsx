import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/DailyFlowLogo.jpg";
import { CgMenuGridR } from "react-icons/cg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <CgMenuGridR />
          </div>

          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <a href="#home" onClick={() => setMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => setMenuOpen(false)}>
                  Features
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setMenuOpen(false)}>
                  About
                </a>
              </li>
            </ul>
            <div className="auth-buttons">
              <button
                className="button-sign-in"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </button>
              <button
                className="button-sign-up"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
