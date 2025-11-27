import "./Home.css";

const Home = ({ onNavigate }) => {
  const features = [
    {
      icon: "📊",
      title: "Track Activities",
      description:
        "Log and monitor your daily activities with detailed time tracking",
    },
    {
      icon: "⏱️",
      title: "Time Management",
      description:
        "Understand how you spend your time and optimize your schedule",
    },
    {
      icon: "📈",
      title: "Productivity Insights",
      description: "Get insights into your productivity patterns and habits",
    },
    {
      icon: "🎯",
      title: "Goal Setting",
      description:
        "Set goals and track your progress across different categories",
    },
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Activity Logger</h1>
        <p className="hero-subtitle">
          Your personal activity management system to track, analyze, and
          optimize your daily routine
        </p>
        <div className="cta-buttons">
          <button className="cta-button" onClick={() => onNavigate("logger")}>
            Start Logging Activities
          </button>
          <button
            className="cta-button secondary"
            onClick={() => onNavigate("dashboard")}
          >
            View Dashboard
          </button>
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-title">Why Use Activity Logger?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Always Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Free to Use</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">∞</div>
          <div className="stat-label">Unlimited Entries</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
