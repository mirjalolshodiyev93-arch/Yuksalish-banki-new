
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
     
export default function LanguageDetector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const ref = useRef();

  // Boshlang'ich til
  useEffect(() => {
    const lang = localStorage.getItem("lang") || i18n.language || "en";
    setCurrentLang(lang === "uz" ? "UZ" : lang === "ru" ? "RU" : "EN");
    i18n.changeLanguage(lang);
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setCurrentLang(lang === "uz" ? "UZ" : lang === "ru" ? "RU" : "EN");
    setOpen(false);
  };

  // Modal tashqarisini bosganda yopish
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
      >
        {currentLang}
      </button>

      {/* Modal */}
      <div
        className={`absolute right-0 mt-2 w-20 bg-white text-black rounded-md shadow-xl z-50 overflow-hidden
          transform transition-all duration-200 ease-out
          ${open ? "opacity-100 scale-95" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        <button
          onClick={() => changeLanguage("en")}
          className="block w-full px-3 py-1.5 hover:bg-gray-200 text-left transition-colors"
        >
          Eng
        </button>
        <button
          onClick={() => changeLanguage("uz")}
          className="block w-full px-3 py-1.5 hover:bg-gray-200 text-left transition-colors"
        >
          Uz
        </button>
        <button
          onClick={() => changeLanguage("ru")}
          className="block w-full px-3 py-1.5 hover:bg-gray-200 text-left transition-colors"
        >
          Ru
        </button>
      </div>
    </div>
  );
}
