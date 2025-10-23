import { Link, NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Menu, Moon, Sun, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 font-medium transition ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : " hover:text-indigo-600 dark:text-gray-200"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/articles"
        className={({ isActive }) =>
          `px-3 py-2 font-medium transition ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : " hover:text-indigo-600 dark:text-gray-200"
          }`
        }
      >
        All Articles
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/my-articles"
            className={({ isActive }) =>
              `px-3 py-2 font-medium transition ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : " hover:text-indigo-600 dark:text-gray-200"
              }`
            }
          >
            My Articles
          </NavLink>
          <NavLink
            to="/post"
            className={({ isActive }) =>
              `px-3 py-2 font-medium transition ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : " hover:text-indigo-600 dark:text-gray-200"
              }`
            }
          >
            Post Article
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `px-3 py-2 font-medium transition ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : " hover:text-indigo-600 dark:text-gray-200"
              }`
            }
          >
            Blogs
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full sticky top-0 z-50  dark:bg-gray-900 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight"
          >
            KnowledgeShare
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">{navLinks}</div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <label className="swap swap-rotate cursor-pointer">
              <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
              <svg
                className="swap-on h-6 w-6 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <Sun/>
              </svg>
              <svg
                className="swap-off h-6 w-6 text-gray-800 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <Moon/>
              </svg>
            </label>

            {/* Auth Buttons */}
            {!user ? (
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring-2 ring-indigo-500">
                    <img
                      src={user.photoURL || "https://i.ibb.co/SnGx7FN/user.png"}
                      
                      alt="User"
                      />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52  dark:text-gray-200"
                >
                  <li><NavLink to="/my-articles">My Articles</NavLink></li>
                  <li><NavLink to="/post">Post Article</NavLink></li>
                  <li><NavLink to="/blogs">Blogs</NavLink></li>
                  <li><button onClick={logout}>Logout</button></li>
                </ul>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden  dark:text-gray-200"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {navLinks}
            {!user && (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
