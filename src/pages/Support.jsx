import Nav from "../components/layout/Nav";
import { Mail, HelpCircle, ShieldCheck, Clock } from "lucide-react";

const Support = () => (
  <>
    <Nav />

    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <HelpCircle className="w-4 h-4" />
          Support
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          We’re Here to Help
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have questions, feedback, or need help using Habit Tracker?
          Our support team is always ready to assist you.
        </p>
      </section>

      {/* Support Options */}
      <section className="container mx-auto max-w-6xl px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">

          <SupportCard
            icon={<Mail className="w-8 h-8 text-indigo-600" />}
            title="Email Support"
            desc="Reach out to us anytime. We usually respond within 24 hours."
            action={
              <a
                href="mailto:mohammedjawad0036@gmail.com"
                className="text-indigo-600 font-semibold hover:underline"
              >
                mohammedjawad0036@gmail.com
              </a>
            }
          />

          <SupportCard
            icon={<Clock className="w-8 h-8 text-green-600" />}
            title="Response Time"
            desc="We value your time and aim to respond as quickly as possible."
            action={
              <span className="font-semibold text-gray-800">
                Within 24 hours
              </span>
            }
          />

          <SupportCard
            icon={<ShieldCheck className="w-8 h-8 text-purple-600" />}
            title="Data & Privacy"
            desc="Your data is safe and private. We never share your information."
            action={
              <a
                href="/privacy-policy"
                className="text-indigo-600 font-semibold hover:underline"
              >
                View Privacy Policy
              </a>
            }
          />
        </div>
      </section>

      {/* Help Text */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            What Can We Help You With?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You can contact us for help with account access, habit tracking,
            feature questions, feedback, or any issues you encounter while
            using Habit Tracker. Your feedback helps us improve the product.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Send us an email and we’ll get back to you as soon as possible.
            </p>

            <a
              href="mailto:mohammedjawad0036@gmail.com"
              className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-xl
                         font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  </>
);

/* ---------- Small Component ---------- */

const SupportCard = ({ icon, title, desc, action }) => (
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm
                  hover:shadow-lg transition-all hover:-translate-y-1 text-center">
    <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 mb-4 leading-relaxed">
      {desc}
    </p>
    {action}
  </div>
);

export default Support;
