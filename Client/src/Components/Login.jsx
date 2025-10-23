// src/Pages/Login.jsx
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden ">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-20"></div>

      <div className="relative z-10 w-full max-w-md bg-white backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue sharing your knowledge
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered  w-full focus:border-indigo-500 focus:ring focus:ring-indigo-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full focus:border-indigo-500 focus:ring focus:ring-indigo-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="divider text-black my-6">or</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center text-black justify-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
