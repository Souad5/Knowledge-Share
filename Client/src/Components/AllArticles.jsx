import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

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
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Articles</h2>

      {/* Dropdown filter */}
      <div className="flex justify-center mb-6">
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
              className="bg-white shadow rounded p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Author:</span>{" "}
                  {article.authorName || "Unknown"}
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
