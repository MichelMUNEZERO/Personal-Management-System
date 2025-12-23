import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGoogle,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="silhouette-overlay"></div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="login-header">
            <h1>
              Welcome back! <span>You've</span> been missed
            </h1>
            <p>Please enter your details. </p>
          </div>

          <div className="social-signin">
            <p className="social-title">Social sign in options</p>
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

          <div className="manual-signin">
            <p className="manual-title">Manual sign in</p>

            <form onSubmit={handleSubmit} className="login-form">
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
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="forgot-password-link">
                <a href="#">Forgot password</a>
              </div>

              <button type="submit" className="login-button">
                Sign in
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                  Sign up
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
