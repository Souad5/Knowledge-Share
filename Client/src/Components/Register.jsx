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
      return Swal.fire("Error", "Password must be at least 6 characters, with uppercase and lowercase letters.", "error");
    }

    try {
      await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now login with your credentials.',
        confirmButtonText: 'Go to Login'
      }).then(() => navigate('/login'));
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto mt-10 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} className="input input-bordered" />
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} className="input input-bordered" />
        <input type="text" placeholder="Photo URL" onChange={(e) => setPhotoURL(e.target.value)} className="input input-bordered" />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} className="input input-bordered" />
        <button className="btn btn-primary">Register</button>
      </form>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
};

export default Register;
