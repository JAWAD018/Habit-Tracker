import Nav from "../../components/layout/Nav";
import { Target } from "lucide-react";

const HowToBuildHabits = () => (
  <>
    <Nav />

    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Target className="w-4 h-4" />
          Habit Building
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          How to Build Daily Habits That Stick
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Building habits is not about motivation or willpower. It is about
          creating systems that make consistency easy and sustainable over time.
        </p>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6 space-y-10 text-gray-700 leading-relaxed">
          <p>
            Many people fail to build habits because they rely on motivation.
            Motivation is temporary and unpredictable. Some days you feel
            energetic, while other days you don’t. Habits that depend on
            motivation usually fail after a short period.
          </p>

          <p>
            The key to building habits that last is starting small. A habit
            should be so easy that skipping it feels harder than doing it.
            Instead of committing to a one-hour workout, start with five minutes.
            Instead of reading one chapter, read one page.
          </p>

          <p>
            Consistency matters more than intensity. When an action is repeated
            daily, it becomes part of your identity. Over time, small actions
            compound into powerful results.
          </p>

          <p>
            Tracking habits plays a critical role in consistency. When you track
            your actions, you become aware of your behavior. Visual progress
            creates accountability and reinforces positive habits.
          </p>

          <p>
            Habit Tracker helps you build habits by focusing on simplicity,
            daily check-ins, and visible progress. Instead of overwhelming you
            with complex features, it encourages one simple action every day.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default HowToBuildHabits;
