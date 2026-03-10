import { useEffect, useState } from "react";

export default function ScrolltopFunc() {
  const [scrollBTN, setScrollBTN] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollBTN(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed z-50 right-4 bottom-4 w-12 h-12
        rounded-full
        bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500
        text-white
        shadow-sm shadow-purple-300/40
        flex justify-center items-center
        transform transition-all duration-300
        ${scrollBTN ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
        hover:scale-105 hover:shadow-md
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6L12 2L16 6" />
        <path d="M12 2V22" />
      </svg>
    </button>
  );
}