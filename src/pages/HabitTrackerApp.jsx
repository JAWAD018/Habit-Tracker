import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";


import { auth, db, googleProvider } from "../firebase";

// Components
import Navbar from "../components/layout/Navbar";
import AuthCard from "../components/Auth/AuthCard";
import Dashboard from "../components/dashboard/Dashboard";
import CreateTask from "../components/tasks/CreateTask";
import CalendarModal from "../components/calendar/CalendarModal";

const HabitTrackerApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loginMode, setLoginMode] = useState("login");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [view, setView] = useState("dashboard");
  const [selectedTask, setSelectedTask] = useState(null);

  const [newTask, setNewTask] = useState({
    name: "",
    duration: 30,
    excludedDays: []
  });

  // ---------------- AUTH ----------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
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
    setView("dashboard");
  };

  // ---------------- LOAD TASKS ----------------
 useEffect(() => {
  if (!currentUser) return;

  const loadAndAutoMark = async () => {
    const snap = await getDocs(
      collection(db, "users", currentUser.uid, "tasks")
    );

    const loadedTasks = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    setTasks(loadedTasks);

    // 🔥 Auto-mark missed days (runs once on app open)
    for (const task of loadedTasks) {
      await autoMarkMissedDays(task);
    }
  };

  loadAndAutoMark();
}, [currentUser]);


  // ---------------- HELPERS ----------------
  const calculateActiveDays = (start, duration, excluded) => {
    let count = 0;
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    for (let i = 0; i < duration; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      if (!excluded.includes(days[d.getDay()])) count++;
    }
    return count;
  };

  const calculateStats = (task) => {
    const checkins = Object.values(task.checkins || {});
    const completed = checkins.filter(c => c.completed).length;
    const missed = checkins.filter(c => !c.completed).length;
    const percentage = task.totalActiveDays
      ? Math.round((completed / task.totalActiveDays) * 100)
      : 0;

    let currentStreak = 0;
    let temp = 0;
    Object.values(task.checkins || {}).forEach(c => {
      if (c.completed) {
        temp++;
        currentStreak = Math.max(currentStreak, temp);
      } else {
        temp = 0;
      }
    });

    return { completed, missed, percentage, currentStreak };
  };

const isActiveDay = (date, excludedDays) => {
  const days = [
    "Sunday","Monday","Tuesday",
    "Wednesday","Thursday","Friday","Saturday"
  ];
  return !excludedDays.includes(days[date.getDay()]);
};


  // ---------------- TASK ACTIONS ----------------
  const createTask = async () => {
    if (!newTask.name.trim()) return alert("Enter task name");

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    await addDoc(
      collection(db, "users", currentUser.uid, "tasks"),
      {
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
        createdAt: new Date().toISOString()
      }
    );

    setNewTask({ name: "", duration: 30, excludedDays: [] });
    setView("dashboard");

    const snap = await getDocs(
      collection(db, "users", currentUser.uid, "tasks")
    );
    setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

const handleCheckin = async (taskId, completed, dateKey) => {
  // 🔥 Optimistic UI update (no extra DB reads)
  setTasks(prev =>
    prev.map(t =>
      t.id === taskId
        ? {
            ...t,
            checkins: {
              ...(t.checkins || {}),
              [dateKey]: {
                completed,
                autoMarked: false,
                timestamp: new Date()
              }
            }
          }
        : t
    )
  );

  try {
    // 🔐 Single DB write for the day (no repeat calls)
    await updateDoc(
      doc(db, "users", currentUser.uid, "tasks", taskId),
      {
        [`checkins.${dateKey}`]: {
          completed,
          autoMarked: false,
          timestamp: serverTimestamp()
        }
      }
    );
  } catch (error) {
    console.error("Check-in failed:", error);
    alert("Something went wrong. Please try again.");
  }
};

const autoMarkMissedDays = async (task) => {
  const startDate = new Date(task.startDate);
  startDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const updates = {};

  for (let d = new Date(startDate); d < today; d.setDate(d.getDate() + 1))
 {
    const dateKey = d.toISOString().split("T")[0];

    // Skip excluded days
    if (!isActiveDay(d, task.excludedDays)) continue;

    // Skip days already checked
    if (task.checkins?.[dateKey]) continue;

    updates[`checkins.${dateKey}`] = {
      completed: false,
      autoMarked: true,
      timestamp: serverTimestamp()
    };
  }

  if (Object.keys(updates).length === 0) return;

  await updateDoc(
    doc(db, "users", currentUser.uid, "tasks", task.id),
    updates
  );
};






  const deleteTask = async (taskId) => {
    if (!confirm("Delete task?")) return;
    await deleteDoc(
      doc(db, "users", currentUser.uid, "tasks", taskId)
    );
    setTasks(tasks.filter(t => t.id !== taskId));
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
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userEmail={currentUser.email}
        onLogout={handleLogout}
      />

      <div className="container mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("dashboard")}
            className={`px-4 py-2 rounded-xl ${
              view === "dashboard"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView("create")}
            className={`px-4 py-2 rounded-xl ${
              view === "create"
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            Create Task
          </button>
        </div>

        {view === "dashboard" && (
          <Dashboard
            tasks={tasks}
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
