import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Personal Management System</h3>
          <p>Organize your life, one task at a time.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#activities">Activities</a>
            </li>
            <li>
              <a href="#calendar">Calendar</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: michelmunezero25@gmail.com</p>
          <p>Phone: (250) 791 268 906</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Personal Management System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
