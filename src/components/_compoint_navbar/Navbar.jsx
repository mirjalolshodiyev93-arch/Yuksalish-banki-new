import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import LanguageDetector from "./en_uz";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles,
  ChevronDown // Yangi ikona
} from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false); // "Yana" menyusi uchun holat
  const [isSwitching, setIsSwitching] = useState(false);
  const { t } = useTranslation();

  // Asosiy va qo'shimcha menyularga ajratamiz
  const mainNavItems = ["home", "services", "contact", "kredit"];
  const extraNavItems = ["aboutus", "dashboard", "card"];

  const toggleDarkMode = () => {
    setIsSwitching(true);
    setDarkMode(!darkMode);
    setTimeout(() => setIsSwitching(false), 700);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isSwitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-950 backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <Sparkles className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-emerald-500" size={20} />
            </motion.div>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-4 font-black tracking-[4px] text-emerald-600 uppercase text-xs"
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${
          scrolled
            ? "h-[85px] bg-white dark:bg-slate-950 shadow-2xl border-b border-gray-200 dark:border-gray-800"
            : "h-[105px] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 dark:from-gray-950 dark:via-slate-950 dark:to-gray-950"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full flex justify-between items-center">
          
          <Link to="/">
            <div
              className="transition-all duration-500 flex items-center justify-center overflow-hidden"
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
                    ? darkMode ? "drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]" : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                    : "drop-shadow-none"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 uppercase text-[12px] font-black tracking-[2px] ${
              scrolled ? "text-slate-900 dark:text-white" : "text-white"
            }`}>
            {mainNavItems.map((item) => (
              <Link key={item} to={item === "home" ? "/" : `/${item}`} className="relative group">
                {t(`navbar.${item}`)}
                <span className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled ? "bg-emerald-600 dark:bg-white" : "bg-white"}`}></span>
              </Link>
            ))}

{/* "YANA" TUGMASI (Dropdown) */}
<div 
  className="relative h-full flex items-center"
  onMouseLeave={() => setMoreOpen(false)} // Sichqoncha uzoqlashsa baribir yopiladi (xavfsizlik uchun)
>
  <button 
    onMouseEnter={() => setMoreOpen(true)} // Sichqoncha borganda ochiladi
    onClick={() => setMoreOpen(!moreOpen)}  // Bosilganda ochiladi, ikkinchi marta bosilganda yopiladi
    className="flex items-center gap-1 group transition-opacity hover:opacity-80 py-4 outline-none"
  >
    {t("navbar.more") || "Yana"} 
    <ChevronDown 
      size={14} 
      className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`} 
    />
  </button>

  <AnimatePresence>
    {moreOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="absolute top-[85%] left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-[60]"
      >
        {extraNavItems.map((item) => (
          <Link
            key={item}
            to={`/${item}`}
            onClick={() => setMoreOpen(false)} // Link tanlanganda menyu yopiladi
            className="block px-4 py-3 text-[11px] rounded-xl transition-all hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-800 dark:text-gray-200 hover:pl-6"
          >
            {t(`navbar.${item}`)}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</div>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode, Clerk va LanguageDetector qismlari o'zgarishsiz qoladi... */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
              onClick={toggleDarkMode}
              className={`p-3 rounded-2xl shadow-lg ${
                scrolled ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400" : "bg-white/20 text-yellow-300"
              }`}
            >
              {darkMode ? <Moon size={22} /> : <Sun size={22} />}
            </motion.button>

            <SignedOut>
              <div className="hidden gap-3 lg:flex">
                <SignInButton mode="modal">
                  <button className={`px-7 py-3 rounded-2xl text-[11px] font-black uppercase border ${scrolled ? "border-slate-900 dark:border-white text-slate-900 dark:text-white" : "border-white/40 text-white"}`}>
                    {t("navbar.SignIn")}
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <div className="hidden sm:block">
              <LanguageDetector />
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-3 rounded-xl ${scrolled ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "bg-white/10 text-white"}`}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu qismi ham o'zgarishsiz, barcha navItemlarni ko'rsatadi */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 w-[320px] h-full bg-white dark:bg-slate-950 z-[101] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b dark:border-slate-800">
                <img src={logo} alt="logo" className="h-12" />
                <button onClick={() => setMenuOpen(false)} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white"><X size={24} /></button>
              </div>
              <div className="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
                {[...mainNavItems, ...extraNavItems].map((item) => (
                  <Link key={item} to={item === "home" ? "/" : `/${item}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between p-4 text-xs font-black tracking-widest uppercase rounded-2xl hover:bg-emerald-50 dark:hover:bg-slate-900 text-slate-900 dark:text-white">
                    {t(`navbar.${item}`)}
                    <ArrowRight size={18} className="text-emerald-500" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}