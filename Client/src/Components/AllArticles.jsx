// Super-Professional UI for AllArticles.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Filter, ArrowUpDown, CalendarDays } from "lucide-react";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { user } = useContext(AuthContext);

  const categories = [
    "Technology",
    "Health",
    "Education",
    "Lifestyle",
    "Science",
    "Business",
    "Entertainment",
    "Other",
  ];

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const query = selectedCategory
        ? `?category=${encodeURIComponent(selectedCategory)}`
        : "";
      const res = await fetch(
        `https://assignment-11-black.vercel.app/api/articles${query}`
      );
      let data = await res.json();

      if (sortOrder === "asc") {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortOrder === "desc") {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setArticles(data);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14 min-h-screen dark:bg-gray-900 transition-all duration-300">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-10  dark:text-white tracking-tight">
        Explore All Articles
      </h2>

      {/* Filters */}
      <div className=" dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-10 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-lg">
            <Filter className="w-5 h-5" /> Filters
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Category */}
            <select
              className="select select-bordered w-full md:w-56 dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort */}
            <div className="relative w-full md:w-56">
              <ArrowUpDown className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <select
                className="select select-bordered w-full pl-10 dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-lg"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by Date</option>
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : articles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className=" dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold  dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Author:</span> {user?.displayName || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Category:</span> {article.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-2">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString()}
                </p>
              </div>

              <div className="px-6 pb-6">
                <Link
                  to={`/articles/${article._id}`}
                  className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-20 text-lg">
          No articles found in this category.
        </p>
      )}
    </div>
  );
};

export default AllArticles;