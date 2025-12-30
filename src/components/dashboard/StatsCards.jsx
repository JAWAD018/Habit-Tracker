import { Target, CheckCircle, Clock } from "lucide-react";

const StatsCards = ({ tasks, dateKey, today }) => {
  const dayNames = [
    "Sunday","Monday","Tuesday",
    "Wednesday","Thursday","Friday","Saturday"
  ];
  const todayName = dayNames[today.getDay()];

  const totalTasks = tasks.length;
  const completedToday = tasks.filter(
    t => t.checkins?.[dateKey]?.completed
  ).length;

  const pendingToday = tasks.filter(t => {
    const startDate = new Date(t.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + t.duration);

    return (
      !t.excludedDays.includes(todayName) &&
      today >= startDate &&
      today < endDate &&
      !t.checkins?.[dateKey]
    );
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Tasks */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Tasks
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {totalTasks}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Check-ins */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Today's Check-ins
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {completedToday}
            </p>
          </div>
        </div>
      </div>

      {/* Pending Today */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Pending Today
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {pendingToday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
