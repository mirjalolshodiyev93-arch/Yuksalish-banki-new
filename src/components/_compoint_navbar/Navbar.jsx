import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import LanguageDetector from "./en_uz";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { t } = useTranslation();
  

  const navItems = [
    "home",
    "services",
    "contact",
    "kredit",
    "aboutus",
    "dashboard",
    "card"
  ];

  const visibleItems = navItems.slice(0, 4);
  const hiddenItems = navItems.slice(4);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled
          ? "h-[75px] bg-white/70 backdrop-blur-xl shadow-xl border-b border-white/20"
          : "h-[100px] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-full flex justify-between items-center">


          {/* LOGO */}
          <Link to="/">
          <div
  className={`transition-all duration-500 flex items-center justify-center overflow-hidden ${
    scrolled
      ? "bg-transparent p-2" // Bu yerda fonni olib tashladim, faqat masofa qoldi
      : "bg-transparent"
  }`}
  style={{
    width: scrolled ? "150px" : "140px",
    height: scrolled ? "60px" : "100px"
  }}
>
  <img
    src={logo}
    alt="Logo"
    className={`w-full h-[110px] object-cover object-center transition-all duration-500 ${
      scrolled 
        ? "drop-shadow-[0_1px_1px_rgba(0,0,0,0.86)]" // 
        : "drop-shadow-none"
    }`}
  />
</div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className={`hidden md:flex gap-8 items-center font-medium uppercase text-[11px] tracking-[2px] ${scrolled ? "text-gray-700" : "text-white"
            }`}>
            {visibleItems.map((item) => (
              <Link
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                className="relative group transition-all duration-300"
              >
                {t(`navbar.${item}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* MORE */}
            {hiddenItems.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1"
                >
                  {t("navbar.more") || "More"} ▾
                </button>

                {moreOpen && (
                  <div className="absolute top-full right-0 mt-3 bg-lime-400 backdrop-blur-xl shadow-2xl rounded-xl py-3 w-[190px] border border-white/30">
                    {hiddenItems.map((item) => (
                      <Link
                        key={item}
                        to={`/${item}`}
                        className="block px-4 py-2 hover:bg-green-500 transition-colors"
                        onClick={() => setMoreOpen(false)}
                      >
                        {t(`navbar.${item}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <Link to="/register" className="hidden sm:block">
              <button
                className={`transition-all duration-500 rounded-xl font-semibold shadow-lg ${scrolled
                  ? "px-5 py-2 text-sm bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-105"
                  : "px-6 py-2.5 text-sm bg-white text-emerald-600 hover:bg-emerald-50"
                  }`}
              >
                {t("navbar.login")}
              </button>
            </Link>

            <div className={`hidden md:block scale-90 ${scrolled ? "" : "text-white"
              }`}>
              <LanguageDetector />
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-2 text-2xl ${scrolled ? "text-emerald-700" : "text-white"
                }`}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU GLASS */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-white/80 backdrop-blur-2xl shadow-2xl p-6 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-emerald-600 font-bold tracking-widest uppercase">
              Menu
            </h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 text-3xl"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 text-lg font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest"
              >
                {t(`navbar.${item}`)}
              </Link>
            ))}

            <hr className="border-gray-200 my-2" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Til</span>
                <LanguageDetector />
              </div>

              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                  {t("navbar.login")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}