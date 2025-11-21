// Improved professional UI version of your Home.jsx
// Clean, modern, consistent, better spacing, better colors, better card design
// Fully Tailwind-optimized, animations improved, structure same

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import KnowledgeHub from "./home_sections/KnowledgeHub";
import JoinCommunity from "./home_sections/JoinCommunity";
import InsightsEvents from "./home_sections/InsightsEvents";

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
    fetch("https://assignment-11-black.vercel.app/api/articles/featured?limit=6")
      .then((res) => res.json())
      .then((data) => setFeaturedArticles(Array.isArray(data) ? data : data?.data || []))
      .catch(() => setFeaturedArticles([]));

    fetch("https://assignment-11-black.vercel.app/api/category/home")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : data?.data || []))
      .catch(() => setCategories([]));

    fetch("https://assignment-11-black.vercel.app/api/top-contributors")
      .then((res) => res.json())
      .then((data) => setTopContributors(Array.isArray(data) ? data : data?.data || []))
      .catch(() => setTopContributors([]));
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-20">

      {/* HERO SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-200 text-white p-14 text-center shadow-lg"
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Share Your Knowledge</h1>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Discover insightful articles and contribute to a thriving community of learners.
        </p>
        <Link
          to="/articles"
          className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition"
        >
          Explore Articles
        </Link>
      </motion.section>


      {/* SLIDER */}
      <section>
        <div className="carousel w-full rounded-2xl overflow-hidden shadow-md">
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
              transition={{ delay: index * 0.15 }}
              
            >
              <img src={src} alt="Slide" className="w-full h-[420px] object-cover" />
            </motion.div>
          ))}
        </div>
      </section>


      {/* FEATURED ARTICLES */}
      <section>
        <h2 className="text-3xl font-bold mb-8 ">Featured Articles</h2>
        {featuredArticles.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredArticles.map((article) => (
              <motion.div
                key={article._id}
                variants={fadeUp}
                className=" rounded-xl shadow hover:shadow-xl transition p-0 overflow-hidden border border-gray-100 flex flex-col"
              >
                <img src={article.thumbnailUrl} alt={article.title} className="h-48 w-full object-cover" />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold  mb-2">{article.title}</h3>
                  <span className="text-sm text-indigo-600 font-medium mb-2">{article.category}</span>
                  <p className="text-gray-600 text-sm flex-grow">{article.content?.slice(0, 100)}...</p>
                  <Link to={`/articles/${article._id}`} className="mt-4">
                    <button className="btn btn-primary w-full">Read More</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No articles found</p>
        )}
      </section>


      {/* CATEGORIES */}
      <section>
        <h2 className="text-3xl font-bold mb-8 ">Browse by Category</h2>
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
                variants={fadeUp}
                className="p-6 rounded-xl shadow border hover:shadow-lg text-center transition"
              >
                <h3 className="text-lg font-semibold ">{cat.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{cat.count} Articles</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}
      </section>


      {/* TOP CONTRIBUTORS */}
      <section>
        <h2 className="text-3xl font-bold mb-8 ">Top Contributors</h2>
        {topContributors.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {topContributors.map((contributor, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-xl shadow text-center border hover:shadow-lg transition"
              >
                <img
                  src={contributor.photo || user?.photoURL}
                  alt={contributor.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-4 shadow"
                />
                <h3 className="font-semibold ">{contributor.name}</h3>
                <p className="text-sm text-gray-500">{contributor.articles} Articles</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No contributors yet</p>
        )}
      </section>


      {/* TESTIMONIALS */}
      <section>
        <h2 className="text-3xl font-bold mb-12 text-center ">What Our Users Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
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
              className="rounded-xl shadow p-8 text-center border hover:shadow-lg transition"
            >
              <p className="italic text-gray-600 mb-4">“{review.text}”</p>
              <h4 className="font-bold  text-lg">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>


      <KnowledgeHub />
      <JoinCommunity />
      <InsightsEvents />


      {/* NEWSLETTER */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="border border-gray-400 p-10 rounded-2xl shadow text-center"
      >
        <h2 className="text-3xl font-bold mb-3 ">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get fresh articles, tips, and updates delivered to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-3 rounded-md flex-grow border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition shadow"
          >
            Subscribe
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default Home;