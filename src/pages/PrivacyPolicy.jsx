import Nav from "../components/layout/Nav";

const PrivacyPolicy = () => (
  <>
    <Nav />

    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your privacy matters to us. This Privacy Policy explains how
          Habit Tracker collects, uses, and protects your information.
        </p>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-6 pb-20 space-y-10">

        {/* 1 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We collect only the information necessary to provide and
            improve Habit Tracker. This may include your email address,
            habit data, and usage information within the app.
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your information is used solely to operate the service,
            personalize your experience, track habit progress, and
            improve features. We do not use your data for advertising
            or sell it to third parties.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            3. Data Storage & Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We take reasonable measures to protect your data from
            unauthorized access, loss, or misuse. While no system is
            completely secure, we continuously improve our security
            practices.
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            4. Data Sharing
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Habit Tracker does not sell, trade, or rent your personal
            data. We only share information when required by law or
            to provide core functionality of the service.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            5. Cookies & Analytics
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may use cookies or similar technologies to improve user
            experience and understand usage patterns. These cookies
            do not track you outside of Habit Tracker.
          </p>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            6. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or delete your data.
            If you wish to remove your account or data, you can contact
            us directly.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            7. Children’s Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Habit Tracker is not intended for children under the age
            of 13. We do not knowingly collect personal information
            from children.
          </p>
        </div>

        {/* 8 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time.
            Continued use of Habit Tracker after changes means you
            accept the updated policy.
          </p>
        </div>

        {/* 9 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            9. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions or concerns about this Privacy
            Policy, please contact us at{" "}
            <a
              href="mailto:mohammedjawad0036@gmail.com"
              className="text-indigo-600 font-semibold hover:underline"
            >
              mohammedjawad0036@gmail.com
            </a>.
          </p>
        </div>

      </section>
    </main>
  </>
);

export default PrivacyPolicy;
