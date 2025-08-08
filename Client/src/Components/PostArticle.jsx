// src/Pages/PostArticle.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const categories = [
  "Technology", "Health", "Education", "Lifestyle",
  "Science", "Business", "Entertainment", "Other",
];

export default function PostArticle() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    thumbnailUrl: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.category) {
      return Swal.fire("Error", "Please fill in all required fields.", "warning");
    }

    const article = {
      title: form.title,
      content: form.content,
      category: form.category,
      tags: form.tags ? form.tags.split(',').map(tag => tag.trim()) : [],
      thumbnailUrl: form.thumbnailUrl,
      date: form.date,
    };

    try {
      const res = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(article),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return Swal.fire("Error", errorData.message || "Failed to post article", "error");
      }

      await res.json();

      Swal.fire({
        title: "Success!",
        text: "Article posted successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/my-articles");
    } catch (err) {
      Swal.fire("Error", err.message || "Network error", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold">Post New Article</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="input input-bordered w-full"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="content"
        placeholder="Content"
        rows={6}
        className="textarea textarea-bordered w-full"
        value={form.content}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        className="select select-bordered w-full"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        className="input input-bordered w-full"
        value={form.tags}
        onChange={handleChange}
      />

      <input
        type="url"
        name="thumbnailUrl"
        placeholder="Thumbnail Image URL"
        className="input input-bordered w-full"
        value={form.thumbnailUrl}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        className="input input-bordered w-full"
        value={form.date}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn btn-primary">Submit Article</button>
    </form>
  );
}
