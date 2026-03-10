import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#1F2937] overflow-hidden text-white">
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="text-yellow-400 text-lg mb-2">
          Houston, we have a problem.
        </p>

        <h1 className="text-8xl md:text-9xl font-extrabold">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mt-2">
          Page not found
        </h2>

        <p className="mt-4 text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Home button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:scale-105 transition transform duration-300"
        >
          Go to Home →
        </button>
      </div>

      {/* Planet */}
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-yellow-500 rounded-full shadow-2xl">
        <div className="absolute top-16 left-20 w-24 h-24 border-8 border-yellow-600 rounded-full"></div>
        <div className="absolute bottom-24 right-24 w-20 h-20 border-8 border-yellow-600 rounded-full"></div>
      </div>

      {/* Astronaut */}
      <div className="absolute right-40 bottom-40 animate-float">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          👨‍🚀
        </div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}