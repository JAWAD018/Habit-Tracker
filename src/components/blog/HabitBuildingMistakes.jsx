import Nav from "../../components/layout/Nav";

const HabitBuildingMistakes = () => (
  <>
    <Nav />

    <main className="bg-white">
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Common Habit-Building Mistakes to Avoid
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understanding why habits fail is the first step toward building
          habits that last.
        </p>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6 space-y-10 text-gray-700">
          <p>
            One common mistake is setting unrealistic goals. Large goals create
            pressure and often lead to burnout.
          </p>

          <p>
            Another mistake is depending on motivation. Motivation fluctuates,
            but systems create stability.
          </p>

          <p>
            Tracking too many habits at once reduces focus and consistency.
          </p>

          <p>
            Skipping progress reviews prevents improvement and reflection.
          </p>

          <p>
            Habit Tracker helps users avoid these mistakes by encouraging clarity
            and consistency.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default HabitBuildingMistakes;
