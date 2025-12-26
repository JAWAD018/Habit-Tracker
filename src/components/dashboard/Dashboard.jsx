import { useState } from "react";
import StatsCards from "./StatsCards";
import TaskCard from "./TaskCard";
import WeeklyProgressChart from "../charts/WeeklyProgressChart";
import { enableNotifications } from "../../utils/enableNotifications";

/* ---------- Weekly Progress Helper ---------- */
const getWeeklyProgressFromFirebase = (tasks = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateKey = date.toISOString().split("T")[0];

    const dayLabel = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    let completed = 0;
    let incompleted = 0;

    tasks.forEach((task) => {
      const checkin = task.checkins?.[dateKey];
      if (!checkin) return;

      if (checkin.completed) {
        completed++;
      } else if (!checkin.autoMarked) {
        incompleted++;
      }
    });

    result.push({
      day: dayLabel,
      completed,
      incompleted,
    });
  }

  return result;
};

/* ---------- Dashboard Component ---------- */
const Dashboard = ({
  tasks,
  dateKey,
  today,
  calculateStats,
  handleCheckin,
  deleteTask,
  setSelectedTask,
}) => {
  const weeklyData = getWeeklyProgressFromFirebase(tasks);

  // 🔔 Notification popup state
  const [showNotifyPrompt, setShowNotifyPrompt] = useState(false);

  // Show notification popup ONCE when user has at least 1 task
  if (
    tasks.length > 0 &&
    !showNotifyPrompt &&
    !localStorage.getItem("notifPromptShown")
  ) {
    setShowNotifyPrompt(true);
    localStorage.setItem("notifPromptShown", "true");
  }

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* 🔢 Stats */}
      <StatsCards tasks={tasks} dateKey={dateKey} today={today} />

      {/* 📊 Weekly Chart */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Weekly Activity
        </h3>

        <div className="w-full overflow-x-auto">
          <WeeklyProgressChart data={weeklyData} />
        </div>
      </div>

      {/* 📋 Task Cards */}
      <div
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 sm:gap-6
        "
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            stats={calculateStats(task)}
            dateKey={dateKey}
            today={today}
            handleCheckin={handleCheckin}
            deleteTask={deleteTask}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </div>

      {/* 🔔 Notification Prompt */}
      {showNotifyPrompt && (
        <div className="fixed bottom-4 left-4 right-4 bg-white shadow-xl rounded-xl p-4 z-50 border">
          <h3 className="font-semibold text-lg">🔔 Daily Reminders</h3>
          <p className="text-sm text-gray-600">
            Get notified so you don’t miss your habits.
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                enableNotifications();
                setShowNotifyPrompt(false);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Enable Notifications
            </button>

            <button
              onClick={() => setShowNotifyPrompt(false)}
              className="text-gray-500"
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
