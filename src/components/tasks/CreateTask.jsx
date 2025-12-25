const CreateTask = ({
  newTask,
  setNewTask,
  calculateActiveDays,
  createTask,
  setView
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100">
      
      {/* Header */}
      <div className="px-8 py-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Task
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Set up your habit and customize active days
        </p>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">

        {/* Task Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Task Name
          </label>
          <input
            type="text"
            placeholder="e.g. Morning Workout"
            value={newTask.name}
            onChange={e => setNewTask({ ...newTask, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            min="1"
            value={newTask.duration}
            onChange={e =>
              setNewTask({ ...newTask, duration: +e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Excluded Days */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-3">
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
                        : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
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
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-900">
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
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition shadow-sm"
          >
            Create Task
          </button>

          <button
            onClick={() => setView("dashboard")}
            className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CreateTask;
