import "./Header.css";

const Header = ({ user }) => {
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="header">
      <h1>
        {firstName ? `${firstName}'s Productivity Hub` : "Activity Logger"}
      </h1>
      <p>
        {firstName
          ? "Review insights, update goals, and log new activities without leaving this workspace."
          : "Track your daily activities and manage your time effectively"}
      </p>
    </div>
  );
};

export default Header;
