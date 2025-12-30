import Nav from "../../components/layout/Nav";

const HabitTrackingProductivity = () => (
  <>
    <Nav />

    <main className="bg-white">
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Why Habit Tracking Improves Productivity
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Productivity increases when important actions become habits rather
          than daily decisions.
        </p>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6 space-y-10 text-gray-700">
          <p>
            Decision fatigue is one of the biggest productivity killers. When
            habits are predefined, you no longer waste energy deciding what to
            do each day.
          </p>

          <p>
            Habit tracking increases awareness. Seeing completed and missed days
            helps users understand how they actually spend their time.
          </p>

          <p>
            Visual feedback reinforces positive behavior. Progress charts
            encourage consistency and build confidence over time.
          </p>

          <p>
            Habit tracking also promotes accountability. When actions are
            recorded, users are more likely to stay consistent.
          </p>

          <p>
            Habit Tracker helps transform productivity into a system rather than
            relying on motivation alone.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default HabitTrackingProductivity;
