import Nav from "../components/layout/Nav";

const Terms = () => (
  <>
    <Nav />

    <main className="bg-white">
      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Please read these terms carefully before using Habit Tracker.
          By accessing or using our service, you agree to be bound by these terms.
        </p>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-6 pb-20 space-y-10">

        {/* 1 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using Habit Tracker, you confirm that you have read,
            understood, and agree to be bound by these Terms of Service. If you do
            not agree with any part of the terms, you may not use the service.
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2. Use of the Service
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Habit Tracker is provided to help users track habits and improve
            productivity. You agree to use the service only for lawful purposes
            and in a way that does not violate any applicable laws or regulations.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            3. User Accounts
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You are responsible for maintaining the confidentiality of your
            account and for all activities that occur under your account.
            Habit Tracker is not responsible for any loss resulting from
            unauthorized access to your account.
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            4. Data & Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your privacy is important to us. We collect and use your data only
            as described in our Privacy Policy. We do not sell or share your
            personal data with third parties.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            5. Service Availability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We strive to keep Habit Tracker available at all times, but we do
            not guarantee uninterrupted or error-free operation. We may update,
            modify, or temporarily suspend the service for maintenance or
            improvements.
          </p>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Habit Tracker is provided "as is" without warranties of any kind.
            We are not liable for any direct or indirect damages arising from
            the use or inability to use the service.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            7. Termination
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to suspend or terminate access to the service
            at any time if a user violates these terms or misuses the platform.
          </p>
        </div>

        {/* 8 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            8. Changes to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms of Service from time to time. Continued use
            of Habit Tracker after changes indicates acceptance of the updated
            terms.
          </p>
        </div>

        {/* 9 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            9. Contact Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about these Terms of Service, please
            contact us at{" "}
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

export default Terms;
