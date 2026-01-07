import Nav from "../components/layout/Nav";
import { Info } from "lucide-react";

const AboutUs = () => (
  <>
    <Nav />

    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Info className="w-4 h-4" />
          About Us
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Helping You Build Better Habits, One Day at a Time
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Our goal is to make habit building simple, consistent, and sustainable
          by focusing on clarity, progress, and everyday accountability.
        </p>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-6 space-y-10 text-gray-700 leading-relaxed">
          <p>
            We believe that lasting change does not come from motivation alone.
            Motivation is temporary, but systems and routines create consistency.
            That is why our platform is designed to support small, repeatable
            actions that grow into meaningful habits over time.
          </p>

          <p>
            Many habit-tracking tools are overly complex and overwhelming. We
            focus on simplicity. Our approach encourages you to check in once a
            day, reflect on your progress, and stay aware of your behavior
            without pressure or guilt.
          </p>

          <p>
            Habit building is not about perfection. Missing a day does not mean
            failure. Our system recognizes real-life patterns and helps you stay
            honest with yourself while keeping your long-term goals in sight.
          </p>

          <p>
            By tracking habits daily, you create visibility into your actions.
            This visibility builds accountability, reinforces positive behavior,
            and makes progress tangible and motivating.
          </p>

          <p>
            We are committed to transparency, privacy, and user trust. Your data
            is handled responsibly, and our focus remains on delivering a clean,
            reliable, and user-friendly experience that supports personal
            growth.
          </p>

          <p>
            Whether you are building a fitness routine, improving focus, or
            creating better daily habits, our mission is to support you every
            step of the way.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default AboutUs;
