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

  const navItemClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition rounded-lg ${
      isActive
        ? ""
        : " "
    }`;

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight"
          >
            KnowledgeShare
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/articles" className={navItemClass}>All Articles</NavLink>

            {user && (
              <>
                <NavLink to="/my-articles" className={navItemClass}>My Articles</NavLink>
                <NavLink to="/post" className={navItemClass}>Post Article</NavLink>
                <NavLink to="/blogs" className={navItemClass}>Blogs</NavLink>
              </>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                onChange={handleToggle}
                checked={theme === "dark"}
              />
              <div className="w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 peer-checked:bg-indigo-600 transition-all"></div>
              <div className="absolute left-0 top-0 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow transform peer-checked:translate-x-6 flex items-center justify-center transition">
                {theme === "dark" ? (
                  <Moon size={16} className="text-indigo-400" />
                ) : (
                  <Sun size={16} className="text-yellow-500" />
                )}
              </div>
            </label>

            {/* Auth Buttons */}
            {!user ? (
              <div className="hidden md:flex gap-2">
                <Link to="/login" className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative group">
                <button className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-500">
                  <img
                    src={user.photoURL || "https://i.ibb.co/SnGx7FN/user.png"}
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <NavLink to="/my-articles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    My Articles
                  </NavLink>
                  <NavLink to="/post" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Post Article
                  </NavLink>
                  <NavLink to="/blogs" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Blogs
                  </NavLink>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/40 text-red-600">
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-2 py-4 border-t border-gray-200 dark:border-gray-700">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/articles" className={navItemClass}>All Articles</NavLink>

            {user && (
              <>
                <NavLink to="/my-articles" className={navItemClass}>My Articles</NavLink>
                <NavLink to="/post" className={navItemClass}>Post Article</NavLink>
                <NavLink to="/blogs" className={navItemClass}>Blogs</NavLink>
              </>
            )}

            {!user && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" className="flex-1 px-4 text-center py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
                  Login
                </Link>
                <Link to="/register" className="flex-1 px-4 text-center py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
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
