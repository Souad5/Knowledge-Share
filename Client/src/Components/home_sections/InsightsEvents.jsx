import React from "react";
import { Users, BookOpen, Calendar } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Active Contributors",
    value: "1.5k+",
  },
  {
    id: 2,
    icon: <BookOpen className="w-8 h-8 text-green-600" />,
    title: "Articles Published",
    value: "10k+",
  },
  {
    id: 3,
    icon: <Calendar className="w-8 h-8 text-purple-600" />,
    title: "Upcoming Webinars",
    value: "12",
  },
];

const InsightsEvents = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          Insights & Events
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsEvents;
