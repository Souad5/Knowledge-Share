import React from "react";

const trendingArticles = [
  {
    id: 1,
    title: "AI in Everyday Life",
    category: "Technology",
    time: "2 min read",
  },
  {
    id: 2,
    title: "Healthy Coding Habits",
    category: "Health",
    time: "3 min read",
  },
  {
    id: 3,
    title: "Education in 2025",
    category: "Education",
    time: "4 min read",
  },
  {
    id: 4,
    title: "Sustainable Lifestyle Tips",
    category: "Lifestyle",
    time: "2 min read",
  },
];

const KnowledgeHub = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Knowledge Hub
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-sm text-blue-600 font-semibold mb-2">
                {article.category}
              </p>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {article.time}
              </p>
              <button className="btn btn-sm btn-primary w-full">Read</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
