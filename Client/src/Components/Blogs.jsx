import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Dummy blogs - replace with API fetch
    const blogData =[
  {
    "id": 1,
    "title": "How to Write Better Articles",
    "content": "Learn the key techniques to improve your writing style and engage your readers more effectively...",
    "author": "John Doe",
    "date": "2025-08-05",
    "image": "https://picsum.photos/id/1015/600/400"
  },
  {
    "id": 2,
    "title": "Top 5 Tips for New Developers",
    "content": "Breaking into the tech industry can be challenging. Here are the top 5 tips to help you succeed...",
    "author": "Jane Smith",
    "date": "2025-08-01",
    "image": "https://picsum.photos/id/1005/600/400"
  },
  {
    "id": 3,
    "title": "The Future of Web Development",
    "content": "Discover the upcoming trends in web development and how they will shape the internet in the next decade...",
    "author": "Alex Johnson",
    "date": "2025-07-28",
    "image": "https://picsum.photos/id/1011/600/400"
  },
  {
    "id": 4,
    "title": "Mastering JavaScript in 2025",
    "content": "From ES2025 features to best practices, explore how to become a JavaScript pro this year...",
    "author": "Sarah Lee",
    "date": "2025-07-20",
    "image": "https://picsum.photos/id/1003/600/400"
  },
  {
    "id": 5,
    "title": "10 Healthy Habits for Remote Workers",
    "content": "Working from home? Here are 10 habits to keep you productive, healthy, and happy...",
    "author": "Michael Brown",
    "date": "2025-07-15",
    "image": "https://picsum.photos/id/1018/600/400"
  },
  {
    "id": 6,
    "title": "The Art of Minimalist Living",
    "content": "Declutter your home and mind with these practical minimalist living tips...",
    "author": "Emily White",
    "date": "2025-07-10",
    "image": "https://picsum.photos/id/1025/600/400"
  },
  {
    "id": 7,
    "title": "AI in Everyday Life",
    "content": "How artificial intelligence is becoming a part of our daily routines without us even noticing...",
    "author": "David Wilson",
    "date": "2025-07-05",
    "image": "https://picsum.photos/id/1016/600/400"
  },
  {
    "id": 8,
    "title": "A Beginner’s Guide to Investing",
    "content": "Everything you need to know to start your investment journey with confidence...",
    "author": "Sophia Martinez",
    "date": "2025-07-01",
    "image": "https://picsum.photos/id/1020/600/400"
  },
  {
    "id": 9,
    "title": "Travel Hacks for Budget Explorers",
    "content": "Discover smart ways to travel the world without breaking the bank...",
    "author": "Liam Taylor",
    "date": "2025-06-28",
    "image": "https://picsum.photos/id/1027/600/400"
  }
]
;
    setBlogs(blogData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold mb-4">Our Latest Blogs</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with our latest articles, tips, and insights from industry experts.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2 hover:text-primary cursor-pointer transition-colors">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                By <span className="font-medium">{blog.author}</span> •{" "}
                {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 flex-grow line-clamp-3">{blog.content}</p>
              <button className="btn btn-primary btn-sm mt-4 self-start">
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
