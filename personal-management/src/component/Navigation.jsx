import "./Navigation.css";

const Navigation = ({ currentPage, onNavigate, user, onLogout }) => {
  const navLinks = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "logger", label: "Logger", icon: "📝" },
  ];

  const initials = (user?.name || "PU")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="nav-logo">📋</span>
        <div>
          <p className="nav-kicker">Personal Management</p>
          <span className="nav-title">Activity Manager</span>
        </div>
      </div>

      <div className="nav-links">
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`nav-link ${currentPage === link.id ? "active" : ""}`}
            onClick={() => onNavigate(link.id)}
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </div>

      <div className="nav-user">
        <div className="nav-user-avatar">{initials}</div>
        <div className="nav-user-meta">
          <strong>{user?.name || "Productive User"}</strong>
          <p>{user?.email || "user@workspace"}</p>
        </div>
        <button className="nav-logout" onClick={onLogout}>
          ↩
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
