import React from "react";
import { useNavigate } from "react-router-dom";


import astronautImg from "../../assets/astronautImg.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#008141] overflow-hidden text-white px-4">
      
 
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

   
      <div className="relative z-10 text-center">
        <p className="text-yellow-300 text-lg mb-2">
          Houston, we have a problem.
        </p>

        <h1 className="text-8xl md:text-9xl font-extrabold">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mt-2">
          Page not found
        </h2>

        <p className="mt-4 text-white/80">
          Oops! The page you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-white text-[#008141] font-semibold rounded-full hover:scale-105 transition transform duration-300"
        >
          Go to Home →
        </button>
      </div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-white/20 rounded-full shadow-2xl">
        <div className="absolute top-16 left-20 w-24 h-24 border-8 border-white/40 rounded-full"></div>
        <div className="absolute bottom-24 right-24 w-20 h-20 border-8 border-white/40 rounded-full"></div>
      </div>

   
      <div className="absolute right-10 md:right-40 bottom-10 md:bottom-40 animate-float w-24 h-24 md:w-32 md:h-32">
        <img
          src={astronautImg}
          alt="Astronaut"
          className="w-full h-full object-contain"
        />
      </div>

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