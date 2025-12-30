import { CheckCircle, XCircle, Calendar, X } from "lucide-react";

const CalendarModal = ({ task, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = today.getFullYear();
  const month = today.getMonth();

  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const fullDayNames = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"
  ];
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const emptySlots = Array(firstDayIndex).fill(null);

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    date.setHours(0, 0, 0, 0);

    const key = date.toISOString().split("T")[0];
    const dayName = fullDayNames[date.getDay()];

    return {
      date,
      checkin: task.checkins?.[key],
      isExcluded: task.excludedDays?.includes(dayName)
    };
  });

  const completed = days.filter(d => d.checkin?.completed).length;
  const missed = days.filter(d => d.checkin && !d.checkin.completed).length;
  const activeDays = days.filter(d => !d.isExcluded).length;
  const percentage = activeDays
    ? Math.round((completed / activeDays) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
                    flex items-end sm:items-center justify-center">

      {/* Modal */}
      <div className="bg-white dark:bg-gray-900 w-full sm:max-w-5xl max-h-[95vh]
                      rounded-t-3xl sm:rounded-3xl shadow-2xl
                      flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600
                        text-white p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold">
                  {task.name}
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100">
                  {monthNames[month]} {year}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/20 transition"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Completed" value={completed} />
            <Stat label="Missed" value={missed} />
            <Stat label="Progress" value={`${percentage}%`} />
            <Stat label="Active Days" value={activeDays} />
          </div>
        </div>

        {/* Calendar */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {dayNames.map(d => (
              <div
                key={d}
                className="text-center text-xs sm:text-sm
                           font-semibold text-gray-600 dark:text-gray-400"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {emptySlots.map((_, i) => (
              <div key={`e-${i}`} />
            ))}

            {days.map((d, i) => {
              let style =
                "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400";

              if (d.isExcluded) {
                style =
                  "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 opacity-60";
              }
              else if (d.checkin?.completed) {
                style =
                  "bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300";
              }
              else if (d.checkin && !d.checkin.completed) {
                style =
                  "bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300";
              }

              return (
                <div
                  key={i}
                  className={`border rounded-lg sm:rounded-xl
                              p-1 sm:p-3 min-h-[52px] sm:min-h-[90px]
                              flex flex-col items-center justify-between
                              text-xs sm:text-sm ${style}`}
                >
                  <div className="font-bold">
                    {d.date.getDate()}
                  </div>

                  <div>
                    {d.checkin?.completed && (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                    {d.checkin && !d.checkin.completed && (
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    {d.isExcluded && (
                      <div className="text-[10px] opacity-60">
                        Rest
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 dark:border-gray-800
                        bg-gray-50 dark:bg-gray-900 p-3 sm:p-4">
          <div className="flex flex-wrap justify-center gap-3
                          text-xs sm:text-sm">
            <Legend color="green" label="Completed" />
            <Legend color="red" label="Missed" />
            <Legend color="gray" label="Rest" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Small Components ---------- */

const Stat = ({ label, value }) => (
  <div className="bg-white/10 rounded-xl p-2 sm:p-3
                  text-center border border-white/20">
    <div className="text-lg sm:text-2xl font-bold">
      {value}
    </div>
    <div className="text-[10px] sm:text-xs text-indigo-100">
      {label}
    </div>
  </div>
);

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-3 h-3 sm:w-4 sm:h-4 rounded border-2 ${
        color === "green" && "bg-green-50 dark:bg-green-900/30 border-green-400"
      } ${
        color === "red" && "bg-red-50 dark:bg-red-900/30 border-red-400"
      } ${
        color === "gray" && "bg-gray-100 dark:bg-gray-700 border-gray-300"
      }`}
    />
    <span className="font-medium text-gray-700 dark:text-gray-300">
      {label}
    </span>
  </div>
);

export default CalendarModal;
