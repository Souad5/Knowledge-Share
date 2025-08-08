import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/articles">All Articles</NavLink></li>
      {user && <li><NavLink to="/my-articles">My Articles</NavLink></li>}
      {user && <li><NavLink to="/post">Post Article</NavLink></li>}
      {user && <li><NavLink to="/blogs">Blogs</NavLink></li>}
    </>
  );

  return (
    <div className="bg-primary text-white w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar">
          {/* Left */}
          <div className="navbar-start">
            <Link to="/" className="font-bold text-xl">
              Knowledge Share
            </Link>
          </div>

          {/* Center */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">
              {navLinks}
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end space-x-2">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className={`w-10 rounded-full `}>
                    <img src={user.photoURL || "https://i.ibb.co/SnGx7FN/user.png"} alt="User" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-black rounded-box w-52"
                >
                  <li><NavLink to="/my-articles">My Articles</NavLink></li>
                  <li><NavLink to="/post">Post Article</NavLink></li>
                  <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                  <li><button onClick={logout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
