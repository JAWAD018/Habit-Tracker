import Nav from "../../components/layout/Nav";

const BestHabitTrackingMethods = () => (
  <>
    <Nav />

    <main className="bg-white">
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Best Habit Tracking Methods in 2025
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Habit tracking has evolved from simple notebooks to powerful digital
          tools designed to improve consistency.
        </p>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6 space-y-10 text-gray-700">
          <p>
            One of the oldest habit tracking methods is pen and paper. Writing
            habits down increases awareness, but it lacks reminders and progress
            analysis.
          </p>

          <p>
            Calendar tracking allows users to mark completed days. This visual
            method helps build consistency but offers limited insights into
            long-term patterns.
          </p>

          <p>
            Streak-based tracking focuses on maintaining consecutive days of
            completion. While motivating, it can feel discouraging when a
            streak breaks.
          </p>

          <p>
            Digital habit trackers combine reminders, analytics, and visual
            progress. They provide better insights into behavior and help users
            identify patterns.
          </p>

          <p>
            Habit Tracker focuses on clarity and simplicity. It avoids pressure
            while still providing enough feedback to keep users consistent.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default BestHabitTrackingMethods;
