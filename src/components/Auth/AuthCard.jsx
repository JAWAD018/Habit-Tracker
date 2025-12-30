import { Target, Mail, Lock, Zap, AlertCircle } from "lucide-react";

const AuthCard = ({
  loginMode,
  setLoginMode,
  credentials,
  setCredentials,
  onAuth,
  onGoogle,
  loading = false,
  error = "",
  setError
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      onAuth();
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
        dark:!bg-gradient-to-br dark:from-indigo-50 dark:via-purple-50 dark:to-pink-50
        flex items-center justify-center p-4 relative overflow-hidden
      "
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative w-full max-w-md">
        <div
          className="
            bg-white/90 dark:!bg-white/90
            backdrop-blur-xl rounded-3xl shadow-2xl
            p-8 border border-white/20
            text-gray-900 dark:!text-gray-900
          "
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl inline-flex shadow-lg mb-4">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Habit Tracker
            </h1>
            <p className="text-gray-600 dark:!text-gray-600 mt-1">
              Build habits that last
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="text-red-600 w-5 h-5 mt-0.5" />
              <p className="text-sm text-red-700 font-medium flex-1">{error}</p>
              <button onClick={() => setError("")} className="text-red-400">
                ×
              </button>
            </div>
          )}

          {/* Mode Switch */}
          <div className="bg-gray-100 dark:!bg-gray-100 p-1.5 rounded-2xl mb-8 flex gap-1">
            {["login", "signup"].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setLoginMode(mode);
                  setError("");
                }}
                disabled={loading}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
                  loginMode === mode
                    ? "bg-white text-indigo-600 shadow"
                    : "text-gray-600"
                }`}
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                className="
                  w-full pl-12 pr-4 py-4 rounded-xl border-2
                  bg-gray-50 dark:!bg-gray-50
                  text-gray-900 dark:!text-gray-900
                  placeholder-gray-400 dark:!placeholder-gray-400
                  focus:border-indigo-500 outline-none
                "
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                onKeyDown={handleKeyPress}
                disabled={loading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className="
                  w-full pl-12 pr-4 py-4 rounded-xl border-2
                  bg-gray-50 dark:!bg-gray-50
                  text-gray-900 dark:!text-gray-900
                  placeholder-gray-400 dark:!placeholder-gray-400
                  focus:border-indigo-500 outline-none
                "
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value
                  })
                }
                onKeyDown={handleKeyPress}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={onAuth}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition mb-4"
          >
            {loading
              ? "Processing..."
              : loginMode === "login"
              ? "Login"
              : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="border-t border-gray-200" />
            <span className="absolute inset-x-0 -top-3 text-xs bg-white px-3 mx-auto w-fit text-gray-500">
              or continue with
            </span>
          </div>

          {/* Google */}
          <button
            onClick={onGoogle}
            disabled={loading}
            className="w-full border-2 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {loginMode === "login" ? "No account?" : "Already registered?"}{" "}
            <button
              onClick={() =>
                setLoginMode(loginMode === "login" ? "signup" : "login")
              }
              className="text-indigo-600 font-bold"
            >
              {loginMode === "login" ? "Sign up" : "Login"}
            </button>
          </p>

          <div className="mt-6 flex justify-center items-center gap-2 text-xs text-gray-500">
            <Zap className="w-4 h-4 text-indigo-600" />
            Trusted by thousands
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default AuthCard;
