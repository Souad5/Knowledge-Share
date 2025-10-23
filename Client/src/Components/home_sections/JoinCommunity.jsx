import React from "react";
import { Link } from "react-router";

const JoinCommunity = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Join Our Knowledge Community
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Share your expertise, learn from others, and grow together in our
            vibrant knowledge-sharing platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link className="btn btn-primary" to="/post">
              Start Writing
            </Link>
            <Link className="btn btn-outline btn-primary" to="/articles">
              Browse Articles
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="https://media.istockphoto.com/id/1166587507/photo/knowledge-transfer-business-knowledge-management.jpg?s=612x612&w=0&k=20&c=qV4DZiAYtBQmVe7OQUcR5EW0USwc4N9zNsaZEdl7rmE="
            alt="Join Community"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
