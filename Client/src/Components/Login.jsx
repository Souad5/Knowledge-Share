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
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Google login successful');
      navigate('/');
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full mt-4">
          Sign in with Google
        </button>
        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
