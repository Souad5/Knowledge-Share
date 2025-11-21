// src/Pages/Register.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
  const { registerUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire(
        "Error",
        "Password must be at least 6 characters long and include uppercase and lowercase letters.",
        "error"
      );
    }

    try {
      await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      Swal.fire({
        icon: 'success',
        title: 'Welcome aboard!',
        text: 'Your account has been created successfully.',
        confirmButtonText: 'Proceed to Login'
      }).then(() => navigate('/login'));
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:px-10 px-4 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">

      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Join the Knowledge Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Share ideas, learn from others, and grow together with passionate minds.
            Start your journey with us today.
          </p>

          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="Knowledge Sharing Illustration"
            className="mt-8 w-full rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <div className="max-w-md w-full bg-white dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">

          <h2 className="text-3xl font-semibold text-center mb-2 text-gray-900 dark:text-white">
            Create Your Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
            Join our platform and start sharing your knowledge.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photo URL (optional)
              </label>
              <input
                type="text"
                placeholder="Profile Image URL"
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter a strong password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Must include uppercase, lowercase, and at least 6 characters.
              </p>
            </div>

            {/* Submit */}
            <button className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition">
              Register
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
