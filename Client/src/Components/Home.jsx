import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // FIXED import

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/articles?limit=6")
      .then((res) => res.json())
      .then((data) => setFeaturedArticles(data));

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("http://localhost:5000/api/top-contributors")
      .then((res) => res.json())
      .then((data) => setTopContributors(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Banner Section */}
      <section className="text-center bg-blue-100 p-10 rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Share Your Knowledge</h1>
        <p className="text-lg text-gray-600 mb-5">
          Explore and share insightful articles across various topics.
        </p>
        <Link
          to="/articles"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Explore Articles
        </Link>
      </section>
      <section>
        <div className="carousel carousel-end rounded-box">
          <div className="carousel-item">
            <img
              src="https://i.postimg.cc/BvmL5cx0/158479-OWTTVV-596.jpg"
              alt="Drink"
              className=" h-[350px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.postimg.cc/PqXv8Fvy/4135851.jpg"
              alt="Drink"
              className=" h-[350px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.postimg.cc/85sFZJHr/8262271.jpg"
              alt="Drink"
              className=" h-[350px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.postimg.cc/LX7Jw9CQ/students-with-illustration-creativity-ideas-light-bulb.jpg"
              alt="Drink"
              className=" h-[350px]"
            />
          </div>
        </div>
      </section>
      {/* Featured Articles */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div key={article._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-gray-600 text-sm my-2">
                Category: {article.category}
              </p>
              <p className="text-gray-500 text-sm">
                Published on: {new Date(article.date).toLocaleDateString()}
              </p>
              <Link
                to={`/articles/${article._id}`}
                className="text-blue-600 mt-3 inline-block"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section>
        <h2 className="text-4xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className=" mx-auto space-y-2">
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the
              instructions sent to your email.
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make
              changes.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
