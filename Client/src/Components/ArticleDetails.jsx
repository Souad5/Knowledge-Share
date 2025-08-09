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

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLikes(data?.likes?.length || 0);
        setLoading(false);
      });

    fetch(`http://localhost:5000/api/articles/${id}/comments`)
      .then((res) => res.json())
      .then(setComments);
  }, [id]);

  const handleLike = async () => {
    if (!user) return toast.error("Login required to like!");

    const res = await fetch(`http://localhost:5000/api/articles/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email }),
    });
    const data = await res.json();
    setLikes(data.likes);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login required to comment!");

    const res = await fetch(
      `http://localhost:5000/api/articles/${id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.displayName,
          userEmail: user.email,
          userPhoto: user.photoURL,
          comment: commentText,
        }),
      }
    );

    if (res.ok) {
      const newComment = await res.json();
      toast.success("Comment added");
      setCommentText("");
      fetch(`http://localhost:5000/api/articles/${id}/comments`)
        .then((res) => res.json())
        .then(setComments);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!article)
    return <div className="text-center text-red-500">Article not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-4xl font-bold">{article.title}</h2>
      <img
        className="w-[650px] h-[350px] rounded"
        src={article.thumbnailUrl}
      ></img>
      <div className="text-gray-500 text-sm">
        Published: {new Date(article.date).toLocaleDateString()}
      </div>
      <div className="flex items-center gap-4 mt-2">
        {article.authorPhoto && (
          <img
            src={article.authorPhoto}
            alt="Author"
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <div className="font-medium">{article.authorName}</div>
          <div className="text-sm text-gray-500">{article.category}</div>
        </div>
      </div>
      <div className="mt-4">
        <p>{article.content}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags?.map((tag, i) => (
          <span key={i} className="badge badge-secondary">
            {tag}
          </span>
        ))}
      </div>

      {/* Likes & Comments */}
      <div className="mt-6 flex items-center gap-6">
        <button onClick={handleLike} className="btn btn-outline">
          ❤️ Like ({likes})
        </button>
        <span>💬 Comments ({comments.length})</span>
      </div>
      {/* Comment form */}
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

      {/* Comments list */}
      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="p-4 bg-gray-100 rounded">
            <div className="flex items-center gap-2 mb-1">
              <img src={c.userPhoto} className="w-8 h-8 rounded-full" />
              <div className="font-medium">{c.userName}</div>
              <span className="text-xs text-gray-400 ml-auto">
                {new Date(c.date).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetails;
// done
