import React from 'react';
import { Target, CheckCircle, BarChart3, Flame, TrendingUp, Calendar, Award, Zap } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate =useNavigate(); 
  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleDemo = () => {
    Navigate('/Demo');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-2 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Habit Tracker</span>
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              Build Better Habits
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Track Habits.
              </span>
              <br />
              <span className="text-gray-900">Build Consistency.</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A powerful habit tracker designed to help you build lasting habits with daily check-ins, streak tracking, and insightful analytics.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started Free
              </button>

              <button
                onClick={handleDemo}
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <StatCard
                  icon={<Target className="w-8 h-8 text-indigo-600" />}
                  label="Active Tasks"
                  value="12"
                  color="indigo"
                />
                <StatCard
                  icon={<CheckCircle className="w-8 h-8 text-green-600" />}
                  label="Completed Today"
                  value="8"
                  color="green"
                />
                <StatCard
                  icon={<Flame className="w-8 h-8 text-orange-600" />}
                  label="Current Streak"
                  value="25"
                  color="orange"
                />
              </div>
              
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Morning Meditation</h3>
                      <p className="text-sm text-gray-600">30 days challenge</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {[1, 1, 1, 1, 1, 0, 1].map((val, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          val ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-indigo-600">23/30 days</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Daily Exercise</h3>
                      <p className="text-sm text-gray-600">60 days challenge</p>
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {[1, 1, 0, 1, 1, 1, 1].map((val, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          val ? 'bg-orange-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-orange-600">45/60 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Everything You Need to
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Build Better Habits
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you stay consistent and achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<CheckCircle className="w-8 h-8 text-green-600" />}
              title="Daily Check-ins"
              desc="Simple Yes/No tracking for each habit. Mark your progress daily and build momentum through consistent action."
              gradient="from-green-50 to-emerald-50"
              border="border-green-200"
            />
            <Feature
              icon={<Flame className="w-8 h-8 text-orange-600" />}
              title="Streak Tracking"
              desc="Watch your streaks grow day by day. Visual motivation that keeps you accountable and celebrates your consistency."
              gradient="from-orange-50 to-amber-50"
              border="border-orange-200"
            />
            <Feature
              icon={<BarChart3 className="w-8 h-8 text-indigo-600" />}
              title="Progress Analytics"
              desc="Comprehensive insights into your completed vs missed days. Understand your patterns and optimize your habits."
              gradient="from-indigo-50 to-purple-50"
              border="border-indigo-200"
            />
            <Feature
              icon={<Calendar className="w-8 h-8 text-blue-600" />}
              title="Calendar View"
              desc="Visual calendar showing your entire habit journey. See your progress at a glance with color-coded status indicators."
              gradient="from-blue-50 to-cyan-50"
              border="border-blue-200"
            />
            <Feature
              icon={<TrendingUp className="w-8 h-8 text-purple-600" />}
              title="Custom Goals"
              desc="Set personalized goals with custom durations and exclude specific days. Make it work for your schedule."
              gradient="from-purple-50 to-pink-50"
              border="border-purple-200"
            />
            <Feature
              icon={<Award className="w-8 h-8 text-yellow-600" />}
              title="Achievement System"
              desc="Track completion percentages, current streaks, and longest streaks. Celebrate every milestone you reach."
              gradient="from-yellow-50 to-orange-50"
              border="border-yellow-200"
            />
          </div>
        </div>
      </section>


<section className="py-20 px-6 bg-linear-to-br from-indigo-600 to-purple-600 text-white">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-black mb-4">
        Designed to Help You Stay Consistent
      </h2>
      <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
        Habit Tracker focuses on clarity, motivation, and long-term progress —
        without overwhelming you.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
        <Flame className="w-10 h-10 text-orange-300 mb-4" />
        <h3 className="text-xl font-bold mb-2">Build Real Streaks</h3>
        <p className="text-indigo-100 text-sm leading-relaxed">
          Visual streaks keep you motivated and help you show up every day,
          even on low-energy days.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
        <BarChart3 className="w-10 h-10 text-indigo-200 mb-4" />
        <h3 className="text-xl font-bold mb-2">See Your Progress</h3>
        <p className="text-indigo-100 text-sm leading-relaxed">
          Understand patterns, spot missed days, and improve consistency
          with clear visual insights.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
        <Calendar className="w-10 h-10 text-blue-200 mb-4" />
        <h3 className="text-xl font-bold mb-2">Stay Organized</h3>
        <p className="text-indigo-100 text-sm leading-relaxed">
          A clean calendar view helps you plan habits and stay intentional
          with your daily actions.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Start Building Better Habits Today
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of people transforming their lives one habit at a time.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
            <p className="text-sm text-indigo-200 mt-4">
              No credit card required • Free forever
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-14 px-6">
  <div className="container mx-auto max-w-6xl">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">
            Habit Tracker
          </span>
        </div>
        <p className="text-sm leading-relaxed">
          A simple and powerful habit tracking app to help you build
          consistency, stay motivated, and achieve long-term goals.
        </p>
      </div>

      {/* Product */}
      <div>
        <h4 className="text-white font-semibold mb-4">Product</h4>
        <ul className="space-y-2 text-sm">
          <li>Habit Tracking</li>
          <li>Streaks</li>
          <li>Calendar View</li>
          <li>Progress Analytics</li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-white font-semibold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
  <li><Link to="/how-it-works">How it Works</Link></li>
  <li><Link to="/demo">Product Demo</Link></li>
  <li><Link to="/faq">FAQs</Link></li>
  <li><Link to="/support">Support</Link></li>
</ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
          <li><Link to='/terms'>Terms of Service</Link></li>
          <li><Link to='/terms'>Cookie Policy</Link></li>
        </ul>
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
      <p>
        © {new Date().getFullYear()} Habit Tracker. All rights reserved.
      </p>
      <p className="mt-2 md:mt-0">
        Built with ❤️ for consistency
      </p>
    </div>

  </div>
</footer>

    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const bgColors = {
    indigo: 'from-indigo-50 to-indigo-100',
    green: 'from-green-50 to-green-100',
    orange: 'from-orange-50 to-orange-100'
  };

  const borderColors = {
    indigo: 'border-indigo-200',
    green: 'border-green-200',
    orange: 'border-orange-200'
  };

  return (
    <div className={`bg-gradient-to-br ${bgColors[color]} rounded-2xl p-6 border ${borderColors[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      </div>
      <div className="text-4xl font-black text-gray-900">{value}</div>
    </div>
  );
};

const Feature = ({ icon, title, desc, gradient, border }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 border ${border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
    <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;