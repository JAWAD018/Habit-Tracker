import StatsCards from "./StatsCards";
import TaskCard from "./TaskCard";
import WeeklyProgressChart from "../charts/WeeklyProgressChart";

const getWeeklyProgressFromFirebase = (tasks = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateKey = date.toISOString().split("T")[0];

    const dayLabel = date.toLocaleDateString("en-US", {
      weekday: "short"
    });

    let completed = 0;
    let incompleted = 0;

    tasks.forEach(task => {
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
      incompleted
    });
  }

  return result;
};


const Dashboard = ({
  tasks,
  dateKey,
  today,
  calculateStats,
  handleCheckin,
  deleteTask,
  setSelectedTask
}) => {
  const weeklyData = getWeeklyProgressFromFirebase(tasks);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* 🔢 Stats */}
      <StatsCards tasks={tasks} dateKey={dateKey} today={today} />

      {/* 📊 Weekly Chart */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 
                      p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Weekly Activity
        </h3>

        {/* Responsive chart wrapper */}
        <div className="w-full overflow-x-auto">
          <WeeklyProgressChart data={weeklyData} />
        </div>
      </div>

      {/* 📋 Task Cards */}
      <div className="
        grid grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-4 sm:gap-6
      ">
        {tasks.map(task => (
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
    </div>
  );
};

export default Dashboard;
