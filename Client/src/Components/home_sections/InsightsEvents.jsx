// --- Insights & Events Section (Revamped UI) ---
import React from "react";
import { Users, BookOpen, Calendar } from "lucide-react";


const stats = [
{
id: 1,
icon: <Users className="w-10 h-10 text-blue-500" />,
title: "Active Contributors",
value: "1.5k+",
},
{
id: 2,
icon: <BookOpen className="w-10 h-10 text-green-500" />,
title: "Articles Published",
value: "10k+",
},
{
id: 3,
icon: <Calendar className="w-10 h-10 text-purple-500" />,
title: "Upcoming Webinars",
value: "12",
},
];


const InsightsEvents = () => {
return (
<section className="py-5  dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
<div className="max-w-7xl mx-auto px-6 text-center">
<h2 className="text-4xl font-extrabold mb-12  dark:text-white tracking-tight">
Insights & Events
</h2>


<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
{stats.map((stat) => (
<div
key={stat.id}
className=" dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/40 dark:border-gray-700/40"
>
<div className="mb-5 flex justify-center">
<div className="p-4 bg-white dark:bg-gray-700 rounded-full shadow-md">
{stat.icon}
</div>
</div>


<h3 className="text-3xl font-extrabold mb-2  dark:text-white">
{stat.value}
</h3>
<p className=" text-lg font-medium">
{stat.title}
</p>
</div>
))}
</div>
</div>
</section>
);
};


export default InsightsEvents;