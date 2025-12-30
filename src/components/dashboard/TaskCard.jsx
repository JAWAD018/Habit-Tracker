import { CheckCircle, XCircle, Trash2, Calendar, Target, Flame } from "lucide-react";

const TaskCard = ({
  task,
  stats,
  dateKey,
  today,
  handleCheckin,
  deleteTask,
  setSelectedTask
}) => {
  const dayNames = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"
  ];
  const todayName = dayNames[today.getDay()];

  const startDate = new Date(task.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + task.duration);

  const isActiveToday =
    !task.excludedDays.includes(todayName) &&
    today >= startDate &&
    today < endDate;

  const todayCheckin = task.checkins?.[dateKey] || null;
  const hasCheckedInToday = Boolean(todayCheckin);
  const isAutoMarked = todayCheckin?.autoMarked === true;

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800
        p-6 hover:shadow-lg hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {task.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Target className="w-3 h-3" />
            {task.totalActiveDays} active days
          </p>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="
            text-gray-400 hover:text-red-500
            p-2 rounded-xl transition-colors
            hover:bg-red-50 dark:hover:bg-red-900/20
          "
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50
                        dark:from-green-900/30 dark:to-emerald-900/20
                        rounded-xl p-3 border border-green-100 dark:border-green-800">
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
            Completed
          </p>
          <p className="font-bold text-green-600 dark:text-green-400 text-lg">
            {stats.completed}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              /{task.totalActiveDays}
            </span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50
                        dark:from-red-900/30 dark:to-rose-900/20
                        rounded-xl p-3 border border-red-100 dark:border-red-800">
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
            Missed
          </p>
          <p className="font-bold text-red-600 dark:text-red-400 text-lg">
            {stats.missed}
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50
                        dark:from-indigo-900/30 dark:to-purple-900/20
                        rounded-xl p-3 border border-indigo-100 dark:border-indigo-800">
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
            Progress
          </p>
          <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">
            {stats.percentage}%
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50
                        dark:from-orange-900/30 dark:to-amber-900/20
                        rounded-xl p-3 border border-orange-100 dark:border-orange-800">
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Streak
          </p>
          <p className="font-bold text-orange-600 dark:text-orange-400 text-lg">
            {stats.currentStreak}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600
                       transition-all duration-500 rounded-full"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>

      {/* Check-in buttons */}
      {isActiveToday && !hasCheckedInToday && (
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => handleCheckin(task.id, true, dateKey)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                       text-sm font-semibold transition-all shadow-sm
                       bg-gradient-to-r from-green-500 to-emerald-500
                       hover:from-green-600 hover:to-emerald-600
                       text-white hover:shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            Yes
          </button>

          <button
            onClick={() => handleCheckin(task.id, false, dateKey)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                       text-sm font-semibold transition-all shadow-sm
                       bg-gradient-to-r from-red-500 to-rose-500
                       hover:from-red-600 hover:to-rose-600
                       text-white hover:shadow-md"
          >
            <XCircle className="w-4 h-4" />
            No
          </button>
        </div>
      )}

      {/* Status badge */}
      {todayCheckin && (
        <div
          className={`flex items-center justify-center gap-2 py-3 rounded-xl mb-5
            text-sm font-semibold border
            ${
              todayCheckin.completed
                ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                : "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
            }`}
        >
          {todayCheckin.completed ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Completed today 🎉
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              Missed today {isAutoMarked && "(auto)"}
            </>
          )}
        </div>
      )}

      {/* Calendar */}
      <button
        onClick={() => setSelectedTask(task)}
        className="
          w-full flex items-center justify-center gap-2 py-3 rounded-xl
          bg-gradient-to-r from-indigo-50 to-purple-50
          dark:from-indigo-900/30 dark:to-purple-900/20
          hover:from-indigo-100 hover:to-purple-100
          dark:hover:from-indigo-900/50 dark:hover:to-purple-900/40
          text-indigo-600 dark:text-indigo-300
          text-sm font-semibold transition-all
          border border-indigo-100 dark:border-indigo-800
        "
      >
        <Calendar className="w-4 h-4" />
        View Calendar
      </button>
    </div>
  );
};

export default TaskCard;
