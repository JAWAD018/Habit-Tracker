import Nav from "../../components/layout/Nav";

const DailyProductivityTips = () => (
  <>
    <Nav />

    <main className="bg-white">
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Daily Productivity Tips for Busy People
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Busy schedules don’t require more hours — they require better habits.
        </p>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6 space-y-10 text-gray-700">
          <p>
            Start each day with one important task. Completing a priority early
            builds momentum and reduces stress.
          </p>

          <p>
            Time blocking helps protect focused work time. Assign specific
            periods for deep work and avoid multitasking.
          </p>

          <p>
            Reducing distractions, especially notifications, significantly
            improves productivity.
          </p>

          <p>
            Small daily habits, when tracked consistently, create long-term
            improvements.
          </p>

          <p>
            Habit Tracker helps busy people stay consistent without adding
            complexity.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default DailyProductivityTips;
