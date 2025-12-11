import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "./Login.css";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !validateEmail(formData.email),
      password: formData.password.length < 6,
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      // Show success notification
      setNotification({
        show: true,
        type: "success",
        message: "Login successful! Redirecting...",
      });

      // Here you would typically handle the login logic
      console.log("Login attempt:", formData);

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      setNotification({
        show: true,
        type: "error",
        message: "Please fix the errors in the form",
      });
      setTimeout(() => {
        setNotification({ show: false, type: "", message: "" });
      }, 3000);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    setNotification({
      show: true,
      type: "success",
      message: `Logging in with ${provider}...`,
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div>
      {/* Notification */}
      <div
        className={`notification ${notification.show ? "show" : ""} ${
          notification.type
        }`}
      >
        {notification.type === "success" ? <FaCheckCircle /> : <FaEnvelope />}
        <span>{notification.message}</span>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="brand-logo">
            <div className="logo-icon">
              <FaClock />
            </div>
            <div className="logo-text">FocusFlow</div>
          </div>

          <div className="brand-content">
            <h1>Welcome Back to Productivity</h1>
            <p>
              Sign in to continue your journey toward better time management and
              increased focus.
            </p>

            <ul className="features-list">
              <li>
                <FaCheckCircle />
                <span>Track your productivity with detailed analytics</span>
              </li>
              <li>
                <FaCheckCircle />
                <span>Manage tasks with our Pomodoro timer</span>
              </li>
              <li>
                <FaCheckCircle />
                <span>Sync across all your devices</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "error" : ""}`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={`error-message ${errors.email ? "show" : ""}`}>
                Please enter a valid email address
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className={`error-message ${errors.password ? "show" : ""}`}>
                Password must be at least 6 characters
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn-login">
              <FaSignInAlt /> Sign In
            </button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <div className="social-login">
              <button
                type="button"
                className="btn-social google"
                onClick={() => handleSocialLogin("Google")}
              >
                <FaGoogle /> Google
              </button>
              <button
                type="button"
                className="btn-social github"
                onClick={() => handleSocialLogin("GitHub")}
              >
                <FaGithub /> GitHub
              </button>
            </div>

            <div className="register-link">
              Don't have an account?{" "}
              <a href="#" id="registerLink">
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
