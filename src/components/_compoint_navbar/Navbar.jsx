import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import LanguageDetector from "./en_uz";

// 👇 Clerk importlari
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = ["home", "services", "contact", "kredit", "aboutus", "dashboard", "card"];
  const visibleItems = navItems.slice(0, 4);
  const hiddenItems = navItems.slice(4);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "h-[75px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-gray-200 dark:border-gray-800"
            : "h-[100px] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-full flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div
              className="transition-all duration-500 flex items-center justify-center overflow-hidden"
              style={{ width: scrolled ? "150px" : "140px", height: scrolled ? "60px" : "100px" }}
            >
              <img
                src={logo}
                alt="Logo"
                className={`w-full h-[110px] object-cover object-center transition-all duration-500 ${
                  scrolled 
                    ? "dark:brightness-0 dark:invert" 
                    : " "
                }`}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex gap-6 items-center font-medium uppercase text-[11px] tracking-[2px] ${
            scrolled ? "text-gray-700 dark:text-gray-200" : "text-white"
          }`}>
            {visibleItems.map((item) => (
              <Link
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                className="relative transition-all duration-300 group"
              >
                {t(`navbar.${item}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {hiddenItems.length > 0 && (
              <div className="relative">
                <button 
                  onClick={() => setMoreOpen(!moreOpen)} 
                  className="flex items-center gap-1 px-3 py-1 transition-all rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:backdrop-blur-md"
                >
                  {t("navbar.more") || "More"} ▾
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 mt-3 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl py-3 w-[200px] border border-gray-100 dark:border-gray-700">
                    {hiddenItems.map((item) => (
                      <Link
                        key={item}
                        to={`/${item}`}
                        className="block px-5 py-2 transition-colors hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
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

          {/* Right section */}
          <div className="flex items-center gap-3">
            
            {/* ☀️🌙 Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center ${
                scrolled 
                  ? "bg-gray-100 dark:bg-gray-800 text-orange-500 dark:text-yellow-300 shadow-inner" 
                  : "bg-white/10 text-yellow-300 backdrop-blur-md"
              }`}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Clerk auth buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className={`transition-all duration-500 rounded-xl font-semibold shadow-lg ${
                    scrolled 
                      ? "px-5 py-2 text-sm bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-105" 
                      : "px-6 py-2.5 text-sm bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400 dark:hover:bg-gray-700"
                  }`}
                >
                  {t("navbar.login")}
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonBox: "hover:scale-105 transition-transform"
                  }
                }}
              />
            </SignedIn>

            {/* Language Detector */}
            <div className={`hidden md:block scale-90 ${scrolled ? "" : ""}`}>
              <LanguageDetector />
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(true)} 
              className={`md:hidden p-2 text-2xl transition-colors ${
                scrolled ? "text-emerald-700 dark:text-emerald-400" : "text-white"
              }`}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl p-6 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Menu</h2>
            <button 
              onClick={() => setMenuOpen(false)} 
              className="text-3xl text-gray-700 dark:text-gray-200 hover:rotate-90 transition-transform"
            >&times;</button>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map(item => (
              <Link
                key={item}
                to={item === "home" ? "/" : `/${item}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium tracking-widest text-gray-700 dark:text-gray-200 uppercase transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {t(`navbar.${item}`)}
              </Link>
            ))}

            <hr className="my-2 border-gray-100 dark:border-gray-800" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Til</span>
                <LanguageDetector />
              </div>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full py-3 text-sm font-bold bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-600 transition-colors">
                    {t("navbar.login")}
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Profil boshqaruvi</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}