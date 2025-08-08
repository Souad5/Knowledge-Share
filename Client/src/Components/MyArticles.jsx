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
      // Changed endpoint to /api/my-articles
      const res = await axios.get("https://server-three-red-77.vercel.app/api/articles", {
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
      text: "You want to delete this article.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://server-three-red-77.vercel.app/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyArticles();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Article deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete article.",
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { _id, title, content, category, tags, thumbnailUrl, date } = editingArticle;

    try {
      await axios.put(
        `https://server-three-red-77.vercel.app/api/articles/${_id}`,
        {
          title,
          content,
          category,
          tags: tags.split(",").map((t) => t.trim()),
          thumbnailUrl,
          date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Article updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditingArticle(null);
      fetchMyArticles();
    } catch (err) {
      console.error(err);
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

  if (loading) return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">My Articles</h2>
      {articles.length === 0 ? (
        <p className="text-center">No articles found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td className="border p-2">{article.title}</td>
                <td className="border p-2">{article.category}</td>
                <td className="border p-2">{article.date?.slice(0, 10)}</td>
                <td className="border p-2">
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => openEditModal(article)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Article</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input type="text" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} placeholder="Title" className="w-full border p-2" />
              <textarea value={editingArticle.content} onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })} placeholder="Content" className="w-full border p-2" />
              <input type="text" value={editingArticle.category} onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })} placeholder="Category" className="w-full border p-2" />
              <input type="text" value={editingArticle.tags} onChange={(e) => setEditingArticle({ ...editingArticle, tags: e.target.value })} placeholder="Tags (comma separated)" className="w-full border p-2" />
              <input type="text" value={editingArticle.thumbnailUrl} onChange={(e) => setEditingArticle({ ...editingArticle, thumbnailUrl: e.target.value })} placeholder="Thumbnail URL" className="w-full border p-2" />
              <input type="date" value={editingArticle.date?.slice(0, 10)} onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })} className="w-full border p-2" />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setEditingArticle(null)} className="btn btn-accent">Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;