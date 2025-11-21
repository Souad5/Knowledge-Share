// src/Pages/Login.jsx
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">

      {/* Decorative Blurred Shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-300 dark:bg-indigo-700 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-300 dark:bg-purple-800 rounded-full filter blur-3xl opacity-30"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/40 dark:border-gray-700/40 transition">

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-8">
          Login to continue sharing your knowledge
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
          </span>
          <span className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400">
              or
            </span>
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google"
          />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Continue with Google
          </span>
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
