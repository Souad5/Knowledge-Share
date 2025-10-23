import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

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
    <div className="max-w-7xl mx-auto px-6 py-10 transition-colors duration-300 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 ">
        All Articles
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <select
          className="select select-bordered w-full md:w-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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

        <select
          className="select select-bordered w-full md:w-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Date: Oldest First</option>
          <option value="desc">Date: Newest First</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg dark:shadow-gray-700 rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Author:</span>{" "}
                  {user?.displayName || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Category:</span>{" "}
                  {article.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span className="font-medium">Published:</span>{" "}
                  {new Date(article.date).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/articles/${article._id}`}
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none mt-auto"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300 mt-10">
          No articles found in this category.
        </p>
      )}
    </div>
  );
};

export default AllArticles;
