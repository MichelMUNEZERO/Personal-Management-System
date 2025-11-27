import "./Navigation.css";

const Navigation = ({ currentPage, onNavigate }) => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="nav-logo">📋</span>
        <span className="nav-title">Activity Logger</span>
      </div>
      <div className="nav-links">
        <button
          className={`nav-link ${currentPage === "home" ? "active" : ""}`}
          onClick={() => onNavigate("home")}
        >
          🏠 Home
        </button>
        <button
          className={`nav-link ${currentPage === "logger" ? "active" : ""}`}
          onClick={() => onNavigate("logger")}
        >
          📝 Logger
        </button>
        <button
          className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
          onClick={() => onNavigate("dashboard")}
        >
          📊 Dashboard
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
