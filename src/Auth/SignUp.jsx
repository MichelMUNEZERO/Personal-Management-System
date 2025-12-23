import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGoogle,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";
import "./SignUp.css";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToComms, setAgreeToComms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-left-content">
          <div className="alx-logo">DailyFlow</div>
          <h1>Welcome to DailyFlow</h1>
          <p>
            Stay organized, manage your time, and take control of your daily
            life all in one place.
          </p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-box">
          <div className="signup-header">
            <h1>Sign up for DailyFlow</h1>
          </div>

          <div className="social-signup">
            <p className="social-title">Social sign up options</p>
            <div className="social-buttons">
              <button type="button" className="social-btn google-btn">
                <FaGoogle />
              </button>
              <button type="button" className="social-btn linkedin-btn">
                <FaLinkedin />
              </button>
              <button type="button" className="social-btn facebook-btn">
                <FaFacebook />
              </button>
            </div>
          </div>

          <div className="manual-signup">
            <p className="manual-title">Manual sign up</p>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                  <FaUser className="input-icon" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                  <FaUser className="input-icon" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  <FaEnvelope className="input-icon" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <p className="password-hint">
                  Must be at least 8 characters, contain uppercase, lowercase,
                  numeric and symbol characters
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword"> Confirm Password *</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="password-hint">
                  Must be at least 8 characters, contain uppercase, lowercase,
                  numeric and symbol characters
                </p>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                  />
                  <span>
                    By signing up I accept DailyFlow's{" "}
                    <a href="#" className="terms-link">
                      terms of services
                    </a>{" "}
                    and acknowledge DailyFlow's{" "}
                    <a href="#" className="terms-link">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeToComms}
                    onChange={(e) => setAgreeToComms(e.target.checked)}
                  />
                  <span>
                    I consent to receive communications from DailyFlow via
                    available channels and may unsubscribe at any time.
                  </span>
                </label>
              </div>

              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </form>

            <div className="signup-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="signin-link">
                  Log in
                </Link>
              </p>
              <p className="support-text">
                Struggling to log in or sign up?{" "}
                <a href="#" className="contact-link">
                  Click here
                </a>{" "}
                to contact us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
