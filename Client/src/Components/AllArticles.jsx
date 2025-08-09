import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // new state for sorting
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
      const res = await fetch(`http://localhost:5000/api/articles${query}`);
      let data = await res.json();

      // Apply sorting
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
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Articles</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <select
          className="select select-bordered w-full max-w-xs"
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
          className="select select-bordered w-full max-w-xs"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Date: Oldest First</option>
          <option value="desc">Date: Newest First</option>
        </select>
      </div>

      {/* Loading spinner */}
      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white shadow rounded p-4 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-black">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Author:</span>{" "}
                  {user?.displayName || "Unknown"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Category:</span>{" "}
                  {article.category}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  <span className="font-medium">Published:</span>{" "}
                  {new Date(article.date).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/articles/${article._id}`}
                className="btn btn-sm btn-primary mt-auto"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No articles found in this category.</p>
      )}
    </div>
  );
};

export default AllArticles;
