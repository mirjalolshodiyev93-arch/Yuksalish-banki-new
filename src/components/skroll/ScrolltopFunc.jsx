import { useEffect, useState } from "react";

export default function ScrolltopFunc() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
   
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        flex items-center justify-center
        w-12 h-12 rounded-2xl
        bg-emerald-500 text-white
        shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]
        transition-all duration-500 ease-in-out
        ${isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-8 pointer-events-none"
        }
        hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-[0_15px_25px_-5px_rgba(16,185,129,0.5)]
        active:scale-90
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
      

      <span className="absolute inset-0 rounded-2xl bg-emerald-400 animate-ping opacity-20 -z-10"></span>
    </button>
  );
}