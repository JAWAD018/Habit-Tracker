import Nav from "../components/layout/Nav";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is Habit Tracker?",
      a: "Habit Tracker is a simple productivity app that helps you build consistent habits through daily check-ins, streak tracking, and visual progress insights."
    },
    {
      q: "Is Habit Tracker free to use?",
      a: "Yes. Habit Tracker is completely free to use. You can create habits, track daily progress, and view analytics without any subscription."
    },
    {
      q: "How does daily check-in work?",
      a: "Each day, you simply mark whether you completed a habit or not. This keeps tracking quick and removes friction from the process."
    },
    {
      q: "What happens if I miss a day?",
      a: "If you miss a day, it is marked as missed. Streaks reset automatically, but your overall progress remains visible."
    },
    {
      q: "Can I exclude rest days?",
      a: "Yes. You can exclude specific days like weekends or rest days when creating a habit."
    },
    {
      q: "Does Habit Tracker work on mobile?",
      a: "Absolutely. Habit Tracker is fully responsive and works smoothly on mobile, tablet, and desktop devices."
    },
    {
      q: "Is my data safe?",
      a: "Yes. Your data is securely stored and only accessible to you. We never sell or share your personal data."
    },
    {
      q: "Can I track multiple habits?",
      a: "Yes. You can create and track as many habits as you like, each with its own schedule and progress."
    }
  ];

  return (
    <>
      <Nav />

      <main className="bg-white">
        {/* Hero */}
        <section className="container mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using Habit Tracker.
            If you still have questions, feel free to reach out.
          </p>
        </section>

        {/* FAQ List */}
        <section className="container mx-auto max-w-4xl px-6 pb-20">
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                question={item.q}
                answer={item.a}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              We’re here to help. Reach out and we’ll get back to you.
            </p>

            <a
              href="/support"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-xl
                         font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

/* ---------- Small Components ---------- */

const FAQItem = ({ question, answer, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center p-6 text-left
                   hover:bg-gray-50 transition"
      >
        <span className="text-lg font-semibold text-gray-900">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQ;
