import { useState } from "react";
import { Target, User, LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ userEmail, onLogout, darkMode, setDarkMode }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 dark:bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-xl">
              <Link to="/home">
                <Target className="w-6 h-6" />
              </Link>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
              <Link to="/home">Habit Tracker</Link>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <User className="w-4 h-4" />
              <span className="text-sm truncate max-w-[180px]">
                {userEmail}
              </span>
            </div>

            {/* 🌗 Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="
                w-10 h-10 rounded-xl
                bg-white/10 hover:bg-white/20
                transition flex items-center justify-center
              "
              title="Toggle theme"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800
                         dark:bg-gray-800 dark:hover:bg-gray-700
                         px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-gray-800 transition"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-indigo-700 dark:bg-gray-800 border-t border-indigo-500 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4 text-left">

            {/* Email */}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-xl">
              <User className="w-4 h-4" />
              <span className="text-sm break-all">{userEmail}</span>
            </div>

            {/* 🌗 Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="
                w-1/3 flex items-center gap-2
                bg-white/10 hover:bg-white/20
                px-4 py-3 rounded-xl text-sm font-medium transition
              "
            >
              {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-1/3 flex items-center gap-2
                         bg-indigo-800 hover:bg-indigo-900
                         dark:bg-gray-700 dark:hover:bg-gray-600
                         px-4 py-3 rounded-xl text-sm font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
