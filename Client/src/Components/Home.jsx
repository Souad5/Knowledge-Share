import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    // Featured Articles
    fetch("http://localhost:5000/api/articles/featured?limit=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedArticles(data);
        } else if (Array.isArray(data.data)) {
          setFeaturedArticles(data.data);
        } else {
          setFeaturedArticles([]);
        }
      })
      .catch(() => setFeaturedArticles([]));

    // Categories
    fetch("http://localhost:5000/api/articles/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      })
      .catch(() => setCategories([]));

    // Top Contributors
    fetch("http://localhost:5000/api/top-contributors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopContributors(data);
        } else if (Array.isArray(data.data)) {
          setTopContributors(data.data);
        } else {
          setTopContributors([]);
        }
      })
      .catch(() => setTopContributors([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-16">
      {/* Hero Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center bg-blue-100 p-10 rounded-xl"
      >
        <h1 className="text-4xl font-bold mb-3">Share Your Knowledge</h1>
        <p className="text-lg text-gray-600 mb-5">
          Discover, read, and share insightful articles from passionate contributors.
        </p>
        <Link
          to="/articles"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Explore Articles
        </Link>
      </motion.section>

      {/* Slider */}
      <section>
        <h1 className="text-center text-3xl font-bold pb-4">Slider</h1>
        <div className="carousel w-full rounded-lg ">
          {[
            "https://i.postimg.cc/qM4GtG2L/books-with-brain-digital-art-style-education-day.jpg",
            "https://i.postimg.cc/sxpKk67B/arrangement-with-book-light-bulb.jpg",
            "https://i.postimg.cc/1R6WVt29/27178.jpg",
            "https://i.postimg.cc/LX7Jw9CQ/students-with-illustration-creativity-ideas-light-bulb.jpg",
          ].map((src, index) => (
            <motion.div
              key={index}
              className="carousel-item w-full"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: index * 0.2 }}
            >
              <img src={src} alt="Slide" className="w-full h-[450px]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 ">Featured Articles</h2>
        {featuredArticles.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {featuredArticles.map((article) => (
              <motion.div
                key={article._id}
                variants={fadeUp}
                className="border rounded-lg shadow hover:shadow-lg transition h-full flex flex-col bg-white"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Category: {article.category}
                  </p>
                  <p className="text-gray-700 text-sm flex-grow">
                    {article.description?.slice(0, 80)}...
                  </p>
                  <Link
                    to={`/articles/${article._id}`}
                    className="text-blue-600 mt-3 inline-block"
                  >
                    See More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No articles found</p>
        )}
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
        {categories.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                }}
                className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 transition text-center"
              >
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{cat.count} Articles</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}
      </section>

      {/* Top Contributors */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Top Contributors</h2>
        {topContributors.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {topContributors.map((contributor, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center p-4 border rounded-lg shadow hover:shadow-lg"
              >
                <img
                  src={contributor.photo || "https://i.ibb.co/SnGx7FN/user.png"}
                  alt={contributor.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold">{contributor.name}</h3>
                <p className="text-sm text-gray-500">
                  {contributor.articles} Articles
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No contributors yet</p>
        )}
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Khan",
              text: "This platform helped me reach a wider audience for my tech blogs.",
            },
            {
              name: "Rahul Das",
              text: "I love the community here. Always supportive and inspiring.",
            },
            {
              name: "Emily Smith",
              text: "A great place to learn and share ideas with like-minded people.",
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white border p-6 rounded-lg shadow hover:shadow-lg"
            >
              <p className="italic text-gray-600 mb-4">"{review.text}"</p>
              <h4 className="font-bold">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-blue-50 p-10 rounded-lg text-center"
      >
        <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get the latest articles and updates directly in your inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-2 rounded-md flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default Home;
