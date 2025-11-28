import { useState } from "react";
import "./AuthPage.css";

const AuthPage = ({ mode = "login", onToggleMode, onAuthenticate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (mode === "signup" && !formData.fullName.trim()) {
      setError("Please provide your full name");
      return;
    }

    onAuthenticate({
      name:
        mode === "signup"
          ? formData.fullName.trim()
          : formData.email.split("@")[0] || "Productive User",
      email: formData.email,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <p className="auth-kicker">Personal Management System</p>
        <h1>Log your day and understand your time</h1>
        <p>
          Everything funnels into your personal dashboard where logging new
          activities and reviewing insights happens in the same view.
        </p>
        <ul>
          <li>Unified activity logger & analytics</li>
          <li>Weekly trend snapshots and goal tracking</li>
          <li>Lightweight onboarding, no extra steps</li>
        </ul>
      </div>

      <div className="auth-card">
        <div className="auth-toggle">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => onToggleMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => onToggleMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Access Dashboard" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? "Need an account?" : "Already onboard?"}
          <button
            onClick={() => onToggleMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create one" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
