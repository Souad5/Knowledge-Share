import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

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

  const openEditModal = (article) => {
    setEditingArticle({
      ...article,
      tags: article.tags.join(", "),
    });
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen  transition-colors duration-300 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-6 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          My Articles
        </h2>

        {articles.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No articles found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                      {article.title}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {article.category}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      {article.date?.slice(0, 10)}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(article)}
                        className="px-4 py-1.5 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="px-4 py-1.5 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white transition-colors"
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

      {/* Edit Modal */}
      {editingArticle && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-lg animate__animated animate__fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-center text-indigo-600 dark:text-indigo-400">
              Edit Article
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              <textarea
                value={editingArticle.content}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    content: e.target.value,
                  })
                }
                placeholder="Content"
                className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              <input
                type="text"
                value={editingArticle.category}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    category: e.target.value,
                  })
                }
                placeholder="Category"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              <input
                type="text"
                value={editingArticle.tags}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    tags: e.target.value,
                  })
                }
                placeholder="Tags (comma separated)"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              <input
                type="text"
                value={editingArticle.thumbnailUrl}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    thumbnailUrl: e.target.value,
                  })
                }
                placeholder="Thumbnail URL"
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              <input
                type="date"
                value={editingArticle.date?.slice(0, 10)}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    date: e.target.value,
                  })
                }
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="btn btn-outline dark:btn-neutral"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
                >
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
