import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        <img
          src="https://i.ibb.co/dwPBBF0y/oops-404-error-with-broken-robot-concept-illustration-114360-1932.jpg"
          alt=""
          className="h-[350px] w-[550px] rounded-2xl opacity-60"
        />
      </h1>
      <p className="text-2xl text-gray-700 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;