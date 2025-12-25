import { CheckCircle, XCircle, Trash2, Calendar, Target, Flame } from "lucide-react";

const TaskCard = ({
  task,
  stats,
  dateKey,        // 👈 must come from parent (single source of truth)
  today,
  handleCheckin,
  deleteTask,
  setSelectedTask
}) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const todayName = dayNames[today.getDay()];

  const startDate = new Date(task.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + task.duration);

  const isActiveToday =
    !task.excludedDays.includes(todayName) &&
    today >= startDate &&
    today < endDate;

  /* ---------------- DB TRUTH ---------------- */
  const todayCheckin = task.checkins?.[dateKey] || null;
  const hasCheckedInToday = Boolean(todayCheckin);  

  const isAutoMarked = todayCheckin?.autoMarked === true;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {task.name}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Target className="w-3 h-3" />
            {task.totalActiveDays} active days
          </p>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2
                     hover:bg-red-50 rounded-xl"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
          <p className="text-gray-600 text-xs mb-1">Completed</p>
          <p className="font-bold text-green-600 text-lg">
            {stats.completed}
            <span className="text-sm text-gray-500">/{task.totalActiveDays}</span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-3 border border-red-100">
          <p className="text-gray-600 text-xs mb-1">Missed</p>
          <p className="font-bold text-red-600 text-lg">{stats.missed}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">
          <p className="text-gray-600 text-xs mb-1">Progress</p>
          <p className="font-bold text-indigo-600 text-lg">{stats.percentage}%</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
          <p className="text-gray-600 text-xs mb-1 flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Streak
          </p>
          <p className="font-bold text-orange-600 text-lg">{stats.currentStreak}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600
                       transition-all duration-500 rounded-full"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>

      {/* ✅ Check-in buttons (ONLY if not completed today) */}
      {isActiveToday && !hasCheckedInToday  && (
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

      {/* ✅ Status badge (DB driven) */}
      {todayCheckin && (
        <div
          className={`flex items-center justify-center gap-2 py-3 rounded-xl mb-5
            text-sm font-semibold
            ${
              todayCheckin.completed
                ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
                : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200"
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
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                   bg-gradient-to-r from-indigo-50 to-purple-50
                   hover:from-indigo-100 hover:to-purple-100
                   text-indigo-600 text-sm font-semibold transition-all
                   border border-indigo-100"
      >
        <Calendar className="w-4 h-4" />
        View Calendar
      </button>
    </div>
  );
};

export default TaskCard;
