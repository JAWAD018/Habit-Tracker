import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HabitTrackerApp from "./pages/HabitTrackerApp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import HowToBuildHabits from "./components/blog/how-to-build-daily-habits";
import BestHabitTrackingMethods from "./components/blog/BestHabitTrackingMethods";
import HabitTrackingProductivity from "./components/blog/HabitTrackingProductivity";
import DailyProductivityTips from "./components/blog/DailyProductivityTips";
import HabitBuildingMistakes from "./components/blog/HabitBuildingMistakes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<HabitTrackerApp />} />

        {/* <Route path="/demo" element={<Demo />} /> */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />

        {/* Blogs Routes */}

         <Route
          path="/blog/how-to-build-daily-habits"
          element={<HowToBuildHabits />}
        />
        <Route
          path="/blog/best-habit-tracking-methods"
          element={<BestHabitTrackingMethods />}
        />
        <Route
          path="/blog/habit-tracking-productivity"
          element={<HabitTrackingProductivity />}
        />
        <Route
          path="/blog/daily-productivity-tips"
          element={<DailyProductivityTips />}
        />
        <Route
          path="/blog/habit-building-mistakes"
          element={<HabitBuildingMistakes />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
