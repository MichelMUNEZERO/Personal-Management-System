import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaUser,
  FaBell,
  FaPalette,
  FaLock,
  FaGlobe,
  FaArrowLeft,
  FaMoon,
  FaSun,
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdEmail, MdPhone } from "react-icons/md";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "Michel MUNEZERO",
    email: "michel@dailyflow.com",
    phone: "+250 788 888 888",
    bio: "Productivity enthusiast and task management expert",
    avatar: null,
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReport: true,
    language: "en",
    timezone: "Africa/Kigali",
    pomodoroLength: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const handleProfileChange = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSettingChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save to backend
    console.log("Saving profile:", userProfile);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileTab = () => (
    <div className="settings-content">
      <div className="settings-header">
        <h2>Profile Settings</h2>
        <button
          className="edit-profile-btn"
          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
        >
          {isEditing ? (
            <>
              <FaSave /> Save Changes
            </>
          ) : (
            <>
              <FaEdit /> Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="profile-section">
        <div className="avatar-container">
          <div className="avatar-wrapper">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt="Profile"
                className="profile-avatar"
              />
            ) : (
              <div className="avatar-placeholder">
                <FaUser />
              </div>
            )}
            {isEditing && (
              <label className="avatar-upload">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>
              <MdEmail /> Email Address
            </label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>
              <MdPhone /> Phone Number
            </label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={userProfile.bio}
              onChange={(e) => handleProfileChange("bio", e.target.value)}
              disabled={!isEditing}
              rows="4"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-content">
      <div className="settings-header">
        <h2>Notification Preferences</h2>
      </div>

      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>
              <MdEmail /> Email Notifications
            </h4>
            <p>Receive email updates about your tasks and activities</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                handleSettingChange("emailNotifications", e.target.checked)
              }
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>
              <IoMdNotifications /> Push Notifications
            </h4>
            <p>Get real-time notifications on your device</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) =>
                handleSettingChange("pushNotifications", e.target.checked)
              }
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>
              <FaBell /> Task Reminders
            </h4>
            <p>Remind me about upcoming tasks and deadlines</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.taskReminders}
              onChange={(e) =>
                handleSettingChange("taskReminders", e.target.checked)
              }
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Weekly Report</h4>
            <p>Receive a weekly summary of your productivity</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.weeklyReport}
              onChange={(e) =>
                handleSettingChange("weeklyReport", e.target.checked)
              }
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="settings-content">
      <div className="settings-header">
        <h2>Appearance & Theme</h2>
      </div>

      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>
              <FaPalette /> Theme Mode
            </h4>
            <p>Choose between light and dark mode</p>
          </div>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isDark ? (
              <>
                <FaSun /> Light Mode
              </>
            ) : (
              <>
                <FaMoon /> Dark Mode
              </>
            )}
          </button>
        </div>

        <div className="theme-preview">
          <div className="theme-card">
            <div className="theme-demo light-demo">
              <div className="demo-header"></div>
              <div className="demo-content">
                <div className="demo-line"></div>
                <div className="demo-line short"></div>
              </div>
            </div>
            <p>Light Theme</p>
            {!isDark && <span className="active-badge">Active</span>}
          </div>

          <div className="theme-card">
            <div className="theme-demo dark-demo">
              <div className="demo-header"></div>
              <div className="demo-content">
                <div className="demo-line"></div>
                <div className="demo-line short"></div>
              </div>
            </div>
            <p>Dark Theme</p>
            {isDark && <span className="active-badge">Active</span>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="settings-content">
      <div className="settings-header">
        <h2>Preferences</h2>
      </div>

      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>
              <FaGlobe /> Language
            </h4>
            <p>Choose your preferred language</p>
          </div>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange("language", e.target.value)}
            className="settings-select"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="rw">Kinyarwanda</option>
            <option value="sw">Swahili</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Timezone</h4>
            <p>Set your local timezone</p>
          </div>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange("timezone", e.target.value)}
            className="settings-select"
          >
            <option value="Africa/Kigali">Africa/Kigali (CAT)</option>
            <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New York (EST)</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Pomodoro Length</h4>
            <p>Duration of focus sessions in minutes</p>
          </div>
          <input
            type="number"
            value={settings.pomodoroLength}
            onChange={(e) =>
              handleSettingChange("pomodoroLength", parseInt(e.target.value))
            }
            className="settings-input-number"
            min="15"
            max="60"
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Short Break</h4>
            <p>Duration of short breaks in minutes</p>
          </div>
          <input
            type="number"
            value={settings.shortBreak}
            onChange={(e) =>
              handleSettingChange("shortBreak", parseInt(e.target.value))
            }
            className="settings-input-number"
            min="3"
            max="10"
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Long Break</h4>
            <p>Duration of long breaks in minutes</p>
          </div>
          <input
            type="number"
            value={settings.longBreak}
            onChange={(e) =>
              handleSettingChange("longBreak", parseInt(e.target.value))
            }
            className="settings-input-number"
            min="10"
            max="30"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-topbar">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1>Settings</h1>
        </div>

        <div className="settings-layout">
          <aside className="settings-sidebar">
            <nav className="settings-nav">
              <button
                className={`nav-item ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser />
                <span>Profile</span>
              </button>
              <button
                className={`nav-item ${
                  activeTab === "notifications" ? "active" : ""
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <FaBell />
                <span>Notifications</span>
              </button>
              <button
                className={`nav-item ${
                  activeTab === "appearance" ? "active" : ""
                }`}
                onClick={() => setActiveTab("appearance")}
              >
                <FaPalette />
                <span>Appearance</span>
              </button>
              <button
                className={`nav-item ${
                  activeTab === "preferences" ? "active" : ""
                }`}
                onClick={() => setActiveTab("preferences")}
              >
                <FaGlobe />
                <span>Preferences</span>
              </button>
            </nav>
          </aside>

          <main className="settings-main">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "notifications" && renderNotificationsTab()}
            {activeTab === "appearance" && renderAppearanceTab()}
            {activeTab === "preferences" && renderPreferencesTab()}
          </main>
        </div>
      </div>
    </div>
  );
}
