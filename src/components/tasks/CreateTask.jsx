const CreateTask = ({
  newTask,
  setNewTask,
  calculateActiveDays,
  createTask,
  setView
}) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
    <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Create New Task
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Set up your habit and customize active days
        </p>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">

        {/* Task Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Task Name
          </label>
          <input
            type="text"
            placeholder="e.g. Morning Workout"
            value={newTask.name}
            onChange={e => setNewTask({ ...newTask, name: e.target.value })}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-indigo-500 focus:outline-none
            "
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            min="1"
            value={newTask.duration}
            onChange={e =>
              setNewTask({ ...newTask, duration: +e.target.value })
            }
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-indigo-500 focus:outline-none
            "
          />
        </div>

        {/* Excluded Days */}
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
            Exclude Days
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ].map(day => {
              const active = newTask.excludedDays.includes(day);

              return (
                <label
                  key={day}
                  className={`cursor-pointer flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition
                    ${
                      active
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-indigo-400"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={active}
                    onChange={e =>
                      setNewTask({
                        ...newTask,
                        excludedDays: e.target.checked
                          ? [...newTask.excludedDays, day]
                          : newTask.excludedDays.filter(d => d !== day)
                      })
                    }
                  />
                  {day}
                </label>
              );
            })}
          </div>
        </div>

        {/* Active Days Info */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-200">
          <span className="font-medium">Active days:</span>{" "}
          <strong>
            {calculateActiveDays(
              new Date(),
              newTask.duration,
              newTask.excludedDays
            )}
          </strong>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={createTask}
            className="
              flex-1 bg-indigo-600 hover:bg-indigo-700
              text-white font-medium py-3 rounded-lg
              transition shadow-sm
            "
          >
            Create Task
          </button>

          <button
            onClick={() => setView("dashboard")}
            className="
              px-6 py-3 rounded-lg
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300
              font-medium transition
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CreateTask;
