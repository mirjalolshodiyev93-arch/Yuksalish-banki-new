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
    className={`transition-all duration-500 flex items-center justify-center overflow-hidden ${
      scrolled ? "bg-transparent p-2" : "bg-transparent"
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
          ? darkMode 
            ? "drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]" 
            : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"    
          : "drop-shadow-none"
      } ${darkMode ? "brightness-110" : "brightness-100"}`}
    />
  </div>
</Link>

    
          <div className={`hidden md:flex gap-8 uppercase text-[12px] font-black tracking-[2px] ${
              scrolled ? "text-slate-900 dark:text-white" : "text-white"
            }`}>
            {navItems.slice(0, 4).map((item) => (
              <Link key={item} to={item === "home" ? "/" : `/${item}`} className="relative overflow-hidden group">
                {t(`navbar.${item}`)}
                <span className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled ? "bg-emerald-600 dark:bg-white" : "bg-white"}`}></span>
              </Link>
            ))}
          </div>


          <div className="flex items-center gap-4">
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
              onClick={toggleDarkMode}
              className={`p-3 rounded-2xl transition-all duration-300 shadow-lg ${
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
                  {darkMode ? <Moon size={22} /> : <Sun size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

    
            <SignedOut>
              <div className="hidden gap-3 lg:flex">
                <SignInButton mode="modal">
                  <button className={`px-7 py-3 rounded-2xl text-[11px] font-black tracking-[1.5px] uppercase transition-all duration-300 border ${
                    scrolled 
                      ? "border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black" 
                      : "border-white/40 bg-white/10 text-white hover:bg-white hover:text-emerald-600"
                  }`}>
                    {t("navbar.SignIn")}
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="px-7 py-3 rounded-2xl text-[11px] font-black tracking-[1.5px] uppercase bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:-translate-y-1 active:translate-y-0">
                    {t("navbar.signup")}
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="p-1 transition-transform border-2 rounded-full border-emerald-400 hover:scale-110">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <div className="hidden sm:block">
              <LanguageDetector />
            </div>

          
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-3 rounded-xl transition-colors ${
                scrolled ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "bg-white/10 text-white"
              }`}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>
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
              className="fixed right-0 top-0 w-[320px] h-full bg-white dark:bg-slate-950 z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.3)] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b dark:border-slate-800">
                <img src={logo} alt="logo" className="h-12" />
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={item === "home" ? "/" : `/${item}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-4 text-xs font-black tracking-widest uppercase transition-all rounded-2xl hover:bg-emerald-50 dark:hover:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {t(`navbar.${item}`)}
                    <ArrowRight size={18} className="text-emerald-500" />
                  </Link>
                ))}
              </div>

              <div className="p-8 space-y-5 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between p-4 bg-white shadow-sm dark:bg-slate-800 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Language</span>
                  <LanguageDetector />
                </div>

                <SignedOut>
                  <div className="grid grid-cols-1 gap-3">
                    <SignInButton mode="modal">
                      <button className="w-full py-4 rounded-2xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-[2px]">
                        {t("navbar.SignIn")}
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase text-[10px] tracking-[2px] shadow-lg">
                        {t("navbar.signup")}
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}