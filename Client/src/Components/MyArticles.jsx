import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const btnPrimary =
  "px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-sm hover:shadow-md transition-all duration-200";

const btnDanger =
  "px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-sm hover:shadow-md transition-all duration-200";

const btnOutline =
  "px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200";

const MyArticles = () => {
  const { user, loading, token } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    if (user && token) fetchMyArticles();
  }, [user, token]);

  const fetchMyArticles = async () => {
    try {
      const res = await axios.get("https://assignment-11-black.vercel.app/api/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This article will be permanently deleted.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://assignment-11-black.vercel.app/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyArticles();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your article has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the article.",
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { _id, title, content, category, tags, thumbnailUrl, date } =
      editingArticle;

    try {
      await axios.put(
        `https://assignment-11-black.vercel.app/api/articles/${_id}`,
        {
          title,
          content,
          category,
          tags: tags.split(",").map((t) => t.trim()),
          thumbnailUrl,
          date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Article updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditingArticle(null);
      fetchMyArticles();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update article.",
      });
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-8 ">
          My Articles
        </h2>

        {articles.length === 0 ? (
          <p className="text-center ">No articles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <td className="p-3 font-medium">{article.title}</td>
                    <td className="p-3">{article.category}</td>
                    <td className="p-3">{article.date?.slice(0, 10)}</td>

                    <td className="p-3 flex justify-center gap-3">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className={btnPrimary}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(article._id)}
                        className={btnDanger}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingArticle && (
        <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
          <div className=" p-6 rounded-xl shadow-2xl w-full max-w-lg">
            <h3 className="text-xl font-semibold text-center mb-4 text-indigo-600">
              Edit Article
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, title: e.target.value })
                }
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />

              <textarea
                value={editingArticle.content}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, content: e.target.value })
                }
                className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />

              <input
                type="text"
                value={editingArticle.category}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, category: e.target.value })
                }
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />

              <input
                type="text"
                value={editingArticle.tags}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, tags: e.target.value })
                }
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />

              <input
                type="date"
                value={editingArticle.date?.slice(0, 10)}
                onChange={(e) =>
                  setEditingArticle({ ...editingArticle, date: e.target.value })
                }
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className={btnOutline}
                >
                  Cancel
                </button>

                <button type="submit" className={btnPrimary}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyArticles;
