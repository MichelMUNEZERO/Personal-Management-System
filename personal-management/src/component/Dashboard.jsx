import { useState, useEffect } from "react";
import "./Dashboard.css";
import DashboardHeader from "./dashboard/DashboardHeader";
import QuickStats from "./dashboard/QuickStats";
import ActivityTimeline from "./dashboard/ActivityTimeline";
import RecentActivities from "./dashboard/RecentActivities";
import GoalsProgress from "./dashboard/GoalsProgress";
import WeeklyOverview from "./dashboard/WeeklyOverview";
import WeeklyPerformance from "./dashboard/WeeklyPerformance";
import QuickActions from "./dashboard/QuickActions";
import InsightsPanel from "./dashboard/InsightsPanel";
import Reminders from "./dashboard/Reminders";

const Dashboard = ({ activities = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateMetrics = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayActivities = activities.filter((activity) => {
        const activityDate = new Date(activity.startTime);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === today.getTime();
      });

      let todayMinutes = 0;
      const todayCategoryHours = {};

      todayActivities.forEach((activity) => {
        const start = new Date(activity.startTime);
        const end = new Date(activity.endTime);
        const minutes = (end - start) / (1000 * 60);
        todayMinutes += minutes;

        if (!todayCategoryHours[activity.category]) {
          todayCategoryHours[activity.category] = 0;
        }
        todayCategoryHours[activity.category] += minutes / 60;
      });

      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);

      const weekActivities = activities.filter((activity) => {
        const activityDate = new Date(activity.startTime);
        return activityDate >= weekAgo;
      });

      const dailyHours = {};
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(day.getDate() - i);
        const dayName = days[day.getDay() === 0 ? 6 : day.getDay() - 1];
        dailyHours[dayName] = 0;

        weekActivities.forEach((activity) => {
          const activityDate = new Date(activity.startTime);
          activityDate.setHours(0, 0, 0, 0);
          day.setHours(0, 0, 0, 0);

          if (activityDate.getTime() === day.getTime()) {
            const start = new Date(activity.startTime);
            const end = new Date(activity.endTime);
            const minutes = (end - start) / (1000 * 60);
            dailyHours[dayName] += minutes / 60;
          }
        });
      }

      const goalTargets = {
        work: 6,
        learning: 2,
        exercise: 1,
        reading: 1,
      };

      const goalsProgress = {};
      Object.keys(goalTargets).forEach((category) => {
        const achieved = todayCategoryHours[category] || 0;
        const target = goalTargets[category];
        goalsProgress[category] = {
          achieved: achieved.toFixed(1),
          target,
          percentage: Math.min(100, (achieved / target) * 100),
        };
      });

      const totalGoalHours = Object.values(goalTargets).reduce(
        (a, b) => a + b,
        0
      );
      const achievedHours = Object.keys(goalTargets).reduce(
        (sum, cat) => sum + (todayCategoryHours[cat] || 0),
        0
      );
      const productivityScore = Math.round(
        (achievedHours / totalGoalHours) * 100
      );

      return {
        todayCompleted: todayActivities.length,
        todayTimeTracked: (todayMinutes / 60).toFixed(1),
        goalsAchieved: Object.values(goalsProgress).filter(
          (g) => parseFloat(g.achieved) >= g.target
        ).length,
        totalGoals: Object.keys(goalTargets).length,
        productivityScore: Math.min(100, productivityScore),
        goalsProgress,
        todayActivities: todayActivities.slice(0, 5).reverse(),
        dailyHours,
        todayCategoryHours,
        weekActivities: weekActivities.length,
      };
    };

    setDashboardData(calculateMetrics());
  }, [activities]);

  const categoryEmojis = {
    work: "💼",
    learning: "📚",
    exercise: "💪",
    reading: "📖",
    break: "🍽️",
    leisure: "🎮",
    other: "📝",
  };

  const categoryColors = {
    work: "#f4a5b9",
    learning: "#e08a9f",
    exercise: "#f9c9d6",
    reading: "#fad4dd",
    break: "#fce4ec",
    leisure: "#f4a5b9",
    other: "#e08a9f",
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDuration = (start, end) => {
    const minutes = (new Date(end) - new Date(start)) / (1000 * 60);
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (!dashboardData) return null;

  const maxDailyHours = Math.max(...Object.values(dashboardData.dailyHours), 8);

  return (
    <div className="dashboard">
      <DashboardHeader currentTime={currentTime} />
      <QuickStats
        stats={{
          todayCompleted: dashboardData.todayCompleted,
          todayTimeTracked: dashboardData.todayTimeTracked,
          goalsAchieved: dashboardData.goalsAchieved,
          totalGoals: dashboardData.totalGoals,
          productivityScore: dashboardData.productivityScore,
        }}
      />

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <ActivityTimeline
            activities={dashboardData.todayActivities}
            categoryColors={categoryColors}
            categoryEmojis={categoryEmojis}
            formatTime={formatTime}
            formatDuration={formatDuration}
          />
          <RecentActivities
            activities={activities.slice(0, 4)}
            categoryColors={categoryColors}
            categoryEmojis={categoryEmojis}
            formatTime={formatTime}
            formatDuration={formatDuration}
          />
        </div>

        <div className="dashboard-column">
          <GoalsProgress
            goals={dashboardData.goalsProgress}
            categoryColors={categoryColors}
            categoryEmojis={categoryEmojis}
          />
          <WeeklyOverview
            dailyHours={dashboardData.dailyHours}
            maxDailyHours={maxDailyHours}
          />
          <WeeklyPerformance dailyHours={dashboardData.dailyHours} />
        </div>

        <div className="dashboard-column">
          <QuickActions />
          <InsightsPanel weekActivities={dashboardData.weekActivities} />
          <Reminders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
