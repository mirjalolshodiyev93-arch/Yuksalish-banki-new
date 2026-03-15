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
  Sparkles 
} from "lucide-react"; // Ikonkalar uchun

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
  const [isSwitching, setIsSwitching] = useState(false);
  const { t } = useTranslation();

  const navItems = ["home", "services", "contact", "kredit", "aboutus", "dashboard", "card"];

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
      {/* 🚀 PREMIUM DARK MODE LOADER */}
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
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={20} />
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

      {/* 🧭 NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${
          scrolled
            ? "h-[75px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-gray-200 dark:border-gray-800"
            : "h-[100px] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={logo} 
              alt="logo" 
              className={`transition-all duration-500 ${scrolled ? "h-[50px]" : "h-[70px] drop-shadow-lg"}`} 
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className={`hidden md:flex gap-8 uppercase text-[11px] font-bold tracking-[2px] ${
              scrolled ? "text-slate-700 dark:text-gray-200" : "text-white"
            }`}>
            {navItems.slice(0, 4).map((item) => (
              <Link key={item} to={item === "home" ? "/" : `/${item}`} className="relative group overflow-hidden">
                {t(`navbar.${item}`)}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE TOOLS */}
          <div className="flex items-center gap-4">
            
            {/* 🌗 ZOR DARK MODE TOGGLE */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-2xl transition-all duration-300 shadow-lg ${
                scrolled 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400" 
                  : "bg-white/20 backdrop-blur-md text-yellow-300 border border-white/20"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? "dark" : "light"}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* DESKTOP AUTH */}
            <SignedOut>
              <div className="hidden lg:flex gap-3">
                <SignInButton mode="modal">
                  <button className={`px-6 py-2.5 rounded-2xl text-[11px] font-black tracking-[1px] uppercase transition-all duration-300 border ${
                    scrolled 
                      ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50" 
                      : "border-white/30 bg-white/10 text-white hover:bg-white hover:text-emerald-600"
                  }`}>
                    {t("navbar.login") || "Sign In"}
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="px-6 py-2.5 rounded-2xl text-[11px] font-black tracking-[1px] uppercase bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:-translate-y-1 active:translate-y-0">
                    {t("navbar.signup") || "Join Now"}
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="p-1 border-2 border-emerald-400 rounded-full">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <div className="hidden sm:block">
              <LanguageDetector />
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                scrolled ? "bg-emerald-50 text-emerald-600" : "bg-white/10 text-white"
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 w-[300px] h-full bg-white dark:bg-slate-950 z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.2)] flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b dark:border-slate-800">
                <img src={logo} alt="logo" className="h-10" />
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 px-6 py-8 overflow-y-auto space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={item === "home" ? "/" : `/${item}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-gray-200 font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    {t(`navbar.${item}`)}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>

              <div className="p-8 border-t dark:border-slate-800 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Language
                  </span>
                  <LanguageDetector />
                </div>

                <SignedOut>
                  <div className="grid grid-cols-1 gap-3">
                    <SignInButton mode="modal">
                      <button className="w-full py-4 rounded-2xl border-2 border-emerald-500 text-emerald-600 font-black uppercase text-[10px] tracking-widest transition-all">
                        Login
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-500/20">
                        Register
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-xs font-bold dark:text-white">Mening Profilim</span>
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}