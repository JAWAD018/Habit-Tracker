import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db, googleProvider } from "../firebase";

// Components
import Navbar from "../components/layout/Navbar";
import AuthCard from "../components/Auth/AuthCard";
import Dashboard from "../components/dashboard/Dashboard";
import CreateTask from "../components/tasks/CreateTask";
import CalendarModal from "../components/calendar/CalendarModal";

const getLocalDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const HabitTrackerApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loginMode, setLoginMode] = useState("login");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [view, setView] = useState("dashboard");
  const [selectedTask, setSelectedTask] = useState(null);
  const [autoMarked, setAutoMarked] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [newTask, setNewTask] = useState({
    name: "",
    duration: 30,
    excludedDays: [],
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ---------------- AUTH ----------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const handleAuth = async () => {
    try {
      if (loginMode === "signup") {
        await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      }
      setCredentials({ email: "", password: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAutoMarked(false); // 👈 reset
    setView("dashboard");
  };

  // ---------------- LOAD TASKS ----------------

  // ---------------- HELPERS ----------------
  const calculateActiveDays = (start, duration, excluded) => {
    let count = 0;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < duration; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      if (!excluded.includes(days[d.getDay()])) count++;
    }
    return count;
  };

  const calculateStats = (task, today) => {
    const checkins = task.checkins || {};
    const excludedDays = task.excludedDays ?? [];

    const completed = Object.values(checkins).filter((c) => c.completed).length;
    const missed = Object.values(checkins).filter(
  (c) => !c.completed && !c.autoMarked
).length;


    const percentage = task.totalActiveDays
      ? Math.round((completed / task.totalActiveDays) * 100)
      : 0;

    // 🔥 FIXED CURRENT STREAK
    let currentStreak = 0;

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // normalize today
    const cursor = new Date(today);
    cursor.setHours(0, 0, 0, 0);

    const startDateKey = task.startDate.split("T")[0];

    while (true) {
      const dateKey = getLocalDateKey(cursor);

      // stop before habit start
      if (dateKey < startDateKey) break;

      const dayName = dayNames[cursor.getDay()];

      // skip excluded days
      if (excludedDays.includes(dayName)) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }

      const checkin = checkins[dateKey];

      // ❌ break streak
      if (!checkin || checkin.completed === false) break;

      // ✅ completed
      currentStreak++;

      cursor.setDate(cursor.getDate() - 1);
    }

    return { completed, missed, percentage, currentStreak };
  };

  const isActiveDay = (date, excludedDays) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return !excludedDays.includes(days[date.getDay()]);
  };

  // ---------------- TASK ACTIONS ----------------
  const createTask = async () => {
    if (!newTask.name.trim()) return alert("Enter task name");

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    await addDoc(collection(db, "users", currentUser.uid, "tasks"), {
      name: newTask.name,
      startDate: start.toISOString(),
      duration: newTask.duration,
      excludedDays: newTask.excludedDays,
      totalActiveDays: calculateActiveDays(
        start,
        newTask.duration,
        newTask.excludedDays
      ),
      checkins: {},
      createdAt: new Date().toISOString(),
    });

    setNewTask({ name: "", duration: 30, excludedDays: [] });
    setView("dashboard");

    const snap = await getDocs(
      collection(db, "users", currentUser.uid, "tasks")
    );
    setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleCheckin = async (taskId, completed, dateKey) => {
    // 🔥 Optimistic UI update (no extra DB reads)
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              checkins: {
                ...(t.checkins || {}),
                [dateKey]: {
                  completed,
                  autoMarked: false,
                  timestamp: new Date(),
                },
              },
            }
          : t
      )
    );

    try {
      // 🔐 Single DB write for the day (no repeat calls)
      await updateDoc(doc(db, "users", currentUser.uid, "tasks", taskId), {
        [`checkins.${dateKey}`]: {
          completed,
          autoMarked: false,
          timestamp: serverTimestamp(),
        },
      });
    } catch (error) {
      console.error("Check-in failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

const autoMarkMissedDays = async (task) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 👉 yesterday = day that ended at 11:59 PM
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateKey = getLocalDateKey(yesterday);
  const habitStartKey = getLocalDateKey(new Date(task.startDate));

  // ⛔ don't mark before habit started
  if (dateKey < habitStartKey) return;

  // ⛔ skip excluded days
  if (!isActiveDay(yesterday, task.excludedDays)) return;

  // ⛔ skip if user already marked yes/no
  if (task.checkins?.[dateKey]) return;

  await updateDoc(
    doc(db, "users", currentUser.uid, "tasks", task.id),
    {
      [`checkins.${dateKey}`]: {
        completed: false,
        autoMarked: true,
        timestamp: serverTimestamp(),
      },
    }
  );

  // 🔄 sync local state
  setTasks((prev) =>
    prev.map((t) =>
      t.id === task.id
        ? {
            ...t,
            checkins: {
              ...(t.checkins || {}),
              [dateKey]: {
                completed: false,
                autoMarked: true,
                timestamp: new Date(),
              },
            },
          }
        : t
    )
  );
};


 useEffect(() => {
  if (!currentUser || autoMarked) return;

  const loadAndAutoMark = async () => {
    setLoadingTasks(true);

    const snap = await getDocs(
      collection(db, "users", currentUser.uid, "tasks")
    );

    const loadedTasks = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setTasks(loadedTasks);

    // ✅ now only auto-marks YESTERDAY
    for (const task of loadedTasks) {
      await autoMarkMissedDays(task);
    }

    setAutoMarked(true);
    setLoadingTasks(false);
  };

  loadAndAutoMark();
}, [currentUser, autoMarked]);


  const deleteTask = async (taskId) => {
    if (!confirm("Delete task?")) return;
    await deleteDoc(doc(db, "users", currentUser.uid, "tasks", taskId));
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // ---------------- LOGIN ----------------
  if (!currentUser) {
    return (
      <AuthCard
        loginMode={loginMode}
        setLoginMode={setLoginMode}
        credentials={credentials}
        setCredentials={setCredentials}
        onAuth={handleAuth}
        onGoogle={handleGoogleLogin}
      />
    );
  }

  // ---------------- MAIN UI ----------------
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateKey = today.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar
        userEmail={currentUser.email}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("dashboard")}
            className={`px-4 py-2 rounded-xl transition ${
              view === "dashboard"
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setView("create")}
            className={`px-4 py-2 rounded-xl transition ${
              view === "create"
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            Create Task
          </button>
        </div>

        {view === "dashboard" && (
          <Dashboard
            tasks={tasks}
            loading={loadingTasks} // ✅ THIS WAS MISSING
            today={today}
            dateKey={dateKey}
            calculateStats={calculateStats}
            handleCheckin={handleCheckin}
            deleteTask={deleteTask}
            setSelectedTask={setSelectedTask}
          />
        )}

        {view === "create" && (
          <CreateTask
            newTask={newTask}
            setNewTask={setNewTask}
            calculateActiveDays={calculateActiveDays}
            createTask={createTask}
            setView={setView}
          />
        )}

        {selectedTask && (
          <CalendarModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default HabitTrackerApp;
