import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const ArticleDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch article and comments on mount or id change
  useEffect(() => {
    setLoading(true);

    fetch(`https://assignment-11-black.vercel.app/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLikes(data?.likes?.length || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(`https://assignment-11-black.vercel.app/api/articles/${id}/comments`)
      .then((res) => res.json())
      .then(setComments);
  }, [id]);

// Example: like button click handler in React
const handleLike = async () => {
  if (!user) return toast.error("Login required to like!");

  const token = localStorage.getItem("token");
  if (!token) return toast.error("Token not found! Please login again.");

  const res = await fetch(`https://assignment-11-black.vercel.app/api/articles/${id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // <-- IMPORTANT
    },
    body: JSON.stringify({ userEmail: user.email }),
  });

  if (res.status === 403) {
    toast.error("Unauthorized. Please login again.");
    return;
  }

  const data = await res.json();
  setLikes(data.likes);
};

const handleCommentSubmit = async (e) => {
  e.preventDefault();
  if (!user) return toast.error("Login required to comment!");
  if (!commentText.trim()) return toast.error("Comment cannot be empty!");

  try {
    // Make sure token is retrieved from localStorage or user object properly
    const token = localStorage.getItem("token") || user.token;
    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      return;
    }

    const res = await fetch(`https://assignment-11-black.vercel.app/api/articles/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  // Use token here
      },
      body: JSON.stringify({ comment: commentText.trim() }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to post comment");
    }

    const newComment = await res.json();
    setComments([newComment, ...comments]);
    setCommentText("");
    toast.success("Comment added!");
  } catch (error) {
    toast.error(error.message);
  }
};

  if (loading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!article) return <div className="text-center text-red-500">Article not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-4xl font-bold">{article.title}</h2>
      <img className="w-full max-h-[350px] object-cover rounded" src={article.thumbnailUrl} alt={article.title} />
      <div className="text-gray-500 text-sm">Published: {new Date(article.date).toLocaleDateString()}</div>

      <div className="flex items-center gap-4 mt-2">
        {article.authorPhoto && <img src={article.authorPhoto} alt="Author" className="w-10 h-10 rounded-full" />}
        <div>
          <div className="font-medium">{article.authorName}</div>
          <div className="text-sm text-gray-500">{article.category}</div>
        </div>
      </div>

      <div className="mt-4">
        <p>{article.content}</p>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <button onClick={handleLike} className="btn btn-outline">
          ❤️ Like ({likes})
        </button>
        <span>💬 Comments ({comments.length})</span>
      </div>

      {user && (
        <form onSubmit={handleCommentSubmit} className="mt-4 space-y-2">
          <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="p-4 bg-gray-100 rounded">
            <div className="flex items-center gap-2 mb-1">
              <img src={c.userPhoto || ""} alt={c.userName} className="w-8 h-8 rounded-full" />
              <div className="font-medium">{c.userName}</div>
              <span className="text-xs text-gray-400 ml-auto">{new Date(c.date).toLocaleString()}</span>
            </div>
            <p className="text-sm text-black">{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetails;
