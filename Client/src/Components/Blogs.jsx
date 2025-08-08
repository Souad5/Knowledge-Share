import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Dummy blogs - replace with API fetch if needed
    const blogData = [
      {
        id: 1,
        title: "How to Write Better Articles",
        content:
          "Learn the key techniques to improve your writing style and engage your readers more effectively...",
        author: "John Doe",
        date: "2025-08-05",
        image: "https://source.unsplash.com/400x250/?writing,books",
      },
      {
        id: 2,
        title: "Top 5 Tips for New Developers",
        content:
          "Breaking into the tech industry can be challenging. Here are the top 5 tips to help you succeed...",
        author: "Jane Smith",
        date: "2025-08-01",
        image: "https://source.unsplash.com/400x250/?coding,laptop",
      },
      {
        id: 3,
        title: "The Future of Web Development",
        content:
          "Discover the upcoming trends in web development and how they will shape the internet in the next decade...",
        author: "Alex Johnson",
        date: "2025-07-28",
        image: "https://source.unsplash.com/400x250/?technology,future",
      },
    ];
    setBlogs(blogData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Our Latest Blogs</h1>
      <p className="text-center max-w-2xl mx-auto mb-10 text-gray-600">
        Stay updated with our latest articles, tips, and insights from experts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-3">
                By {blog.author} • {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <button className="btn btn-primary btn-sm">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
