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
      return Swal.fire("Error", "Password must be at least 6 characters long and include uppercase and lowercase letters.", "error");
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center my-10">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2  items-center justify-center  ">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Join the Knowledge Community</h1>
          <p className="text-lg ">
            Share ideas, learn from others, and grow together with passionate minds.  
            Start your journey with us today.
          </p>
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="Knowledge Sharing Illustration"
            className="mt-8 w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="">
        <div className="max-w-md mx-auto  rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold  mb-2 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Join our platform and start sharing your knowledge.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium  mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full input input-bordered border-gray-300  focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input input-bordered border-gray-300  focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">Photo URL (optional)</label>
              <input
                type="text"
                placeholder="Profile Image URL"
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full input input-bordered border-gray-300  focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter a strong password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full input input-bordered border-gray-300  focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Must include uppercase, lowercase, and at least 6 characters.
              </p>
            </div>

            <button className="w-full py-3 mt-4 btn btn-primary transition-all duration-300 rounded-lg text-white font-semibold text-lg">
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
