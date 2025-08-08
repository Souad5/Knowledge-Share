import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Knowledge Share
        </Link>
      </div>

      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/articles">All Articles</Link></li>
          <li><Link to="/my-articles">My Articles</Link></li>
          <li><Link to="/post">Post Article</Link></li>
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/SnGx7FN/user.png"} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/my-articles">My Articles</Link></li>
              <li><Link to="/post">Post Article</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
