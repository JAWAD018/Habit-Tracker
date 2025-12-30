import StatsCards from "./StatsCards";
import TaskCard from "./TaskCard";
import WeeklyProgressChart from "../charts/WeeklyProgressChart";
import { useState } from "react";

/* ---------------- WEEKLY DATA ---------------- */
const getWeeklyProgressFromFirebase = (tasks = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateKey = date.toISOString().split("T")[0];
    const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });

    let completed = 0;
    let incompleted = 0;

    tasks.forEach(task => {
      const checkin = task.checkins?.[dateKey];
      if (!checkin) return;

      if (checkin.completed) completed++;
      else if (!checkin.autoMarked) incompleted++;
    });

    result.push({ day: dayLabel, completed, incompleted });
  }

  return result;
};

/* ---------------- MONTHLY DATA ---------------- */
const getMonthlyProgressFromFirebase = (tasks = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const result = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    const dateKey = date.toISOString().split("T")[0];

    let completed = 0;
    let incompleted = 0;

    tasks.forEach(task => {
      const checkin = task.checkins?.[dateKey];
      if (!checkin) return;

      if (checkin.completed) completed++;
      else if (!checkin.autoMarked) incompleted++;
    });

    result.push({
      day: day.toString(),
      completed,
      incompleted
    });
  }

  return result;
};

/* ---------------- DASHBOARD ---------------- */
const Dashboard = ({
  tasks,
  dateKey,
  today,
  calculateStats,
  handleCheckin,
  deleteTask,
  setSelectedTask
}) => {
  const [chartView, setChartView] = useState("weekly");

  const chartData =
    chartView === "weekly"
      ? getWeeklyProgressFromFirebase(tasks)
      : getMonthlyProgressFromFirebase(tasks);

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* 🔢 Stats */}
      <StatsCards tasks={tasks} dateKey={dateKey} today={today} />

      {/* 📊 Chart Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setChartView("weekly")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            chartView === "weekly"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Weekly
        </button>

        <button
          onClick={() => setChartView("monthly")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            chartView === "monthly"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* 📈 Chart Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
          {chartView === "weekly" ? "Weekly Activity" : "Monthly Activity"}
        </h3>

        <div className="w-full overflow-x-auto">
          <WeeklyProgressChart data={chartData} />
        </div>
      </div>

      {/* 🗂 Task Cards */}
      <div
        className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 sm:gap-6
        "
      >
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            stats={calculateStats(task, today)}
            dateKey={dateKey}
            today={today}
            handleCheckin={handleCheckin}
            deleteTask={deleteTask}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
