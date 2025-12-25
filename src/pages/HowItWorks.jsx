import Nav from "../components/layout/Nav";
import {
  CheckCircle,
  Flame,
  Calendar,
  BarChart3,
  Target
} from "lucide-react";

const HowItWorks = () => (
  <>
    <Nav />

    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Target className="w-4 h-4" />
          Simple • Effective • Consistent
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          How Habit Tracker Works
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Habit Tracker helps you build better habits through daily check-ins,
          streak tracking, and visual progress insights — all designed to keep
          you consistent without feeling overwhelmed.
        </p>
      </section>

      {/* Steps */}
      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">

          <StepCard
            icon={<Target className="w-8 h-8 text-indigo-600" />}
            title="Create a Habit"
            desc="Add a habit you want to build. Set duration, exclude rest days, and define what success looks like for you."
          />

          <StepCard
            icon={<CheckCircle className="w-8 h-8 text-green-600" />}
            title="Daily Check-ins"
            desc="Every day, simply mark Yes or No. No complex inputs — just a quick decision to keep you accountable."
          />

          <StepCard
            icon={<Flame className="w-8 h-8 text-orange-600" />}
            title="Build Streaks"
            desc="Completed days build streaks automatically. Watch your consistency grow and stay motivated."
          />

          <StepCard
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Visual Progress"
            desc="View your habit journey on a calendar with clear completed and missed days."
          />
        </div>
      </section>

      {/* Why it works */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Habit Tracker Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Habit Tracker is designed around behavioral psychology —
              making consistency easy and progress visible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <WhyCard
              icon={<CheckCircle className="w-7 h-7 text-green-600" />}
              title="Simple by Design"
              desc="No clutter, no confusion. Simplicity reduces friction and helps you show up every day."
            />
            <WhyCard
              icon={<Flame className="w-7 h-7 text-orange-600" />}
              title="Streak Motivation"
              desc="Streaks provide a powerful psychological push to stay consistent and avoid breaking momentum."
            />
            <WhyCard
              icon={<BarChart3 className="w-7 h-7 text-indigo-600" />}
              title="Clear Insights"
              desc="See completed vs missed days and understand your patterns over time."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Start Building Better Habits Today
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Consistency beats motivation. Let Habit Tracker help you
              stay on track — one day at a time.
            </p>

            <a
              href="/dashboard"
              className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg
                         hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </main>
  </>
);

/* ---------- Small Components ---------- */

const StepCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm
                  hover:shadow-lg transition-all hover:-translate-y-1">
    <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {desc}
    </p>
  </div>
);

const WhyCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default HowItWorks;
