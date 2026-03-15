import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, User, Settings, CreditCard, Send, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function DashboardLayout() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // 1. Initial Loading va AOS boshqaruvi
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
      offset: 50,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 2. Har safar sahifa (path) o'zgarganda AOSni yangilash
  // Bu link bosilganda sidebar elementlari yo'qolib qolishini oldini oladi
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  const navLinks = [
    { to: "profile", label: t("dashboard.profil"), icon: <User size={18} /> },
    { to: "settings", label: t("dashboard.sozlamalar"), icon: <Settings size={18} /> },
    { to: "transactions", label: t("dashboard.tranzaksiyalar"), icon: <CreditCard size={18} /> },
    { to: "srm", label: t("dashboard.sorovyuborish"), icon: <Send size={18} /> },
  ];

  return (
    <>
      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full"
              />
              <LayoutDashboard className="absolute text-emerald-600 animate-pulse" size={32} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-500 relative pt-[100px]">
        
        {/* MOBILE MENU BUTTON */}
        <button
          className={`md:hidden fixed top-[115px] right-6 z-40 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-emerald-100 dark:border-gray-700 active:scale-95 transition-all duration-300 ${
            isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"
          }`}
          onClick={toggleSidebar}
        >
          <Menu size={24} className="text-emerald-600 dark:text-emerald-400" />
        </button>

        {/* DESKTOP SIDEBAR */}
        <aside 
          className="w-64 bg-white dark:bg-gray-900 shadow-md p-6 hidden md:flex flex-col sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
              <LayoutDashboard size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("dashboard.title")}</h2>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${
                  location.pathname.includes(link.to)
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <Link 
            to="/" 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 mt-auto font-bold transition-colors"
          >
            <LogOut size={18} />
            {t("dashboard.chiqish")}
          </Link>
        </aside>

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed top-[100px] right-0 w-80 h-[calc(100vh-100px)] bg-white dark:bg-gray-900 shadow-[-15px_0_30px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-500 ease-in-out
                      ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden flex flex-col`}
        >
          <div className="bg-gradient-to-br from-emerald-600 to-green-500 p-6 relative min-h-[1400px] flex flex-col justify-end overflow-hidden">
             {/* Bezak uchun doira */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            
            <button onClick={toggleSidebar} className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition">
              <X size={24} />
            </button>
            <h2 className="text-white font-bold text-xl relative z-10">Yuksalish Bank</h2>
            <p className="text-white/80 text-xs italic relative z-10">Shaxsiy kabinet</p>
          </div>

          <nav className="p-4 flex flex-col gap-2 flex-1 dark:bg-gray-900">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                onClick={toggleSidebar} 
                to={link.to} 
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  location.pathname.includes(link.to)
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              > 
                {link.icon}
                {link.label} 
              </Link>
            ))}
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
              <Link to="/" className="flex items-center gap-3 p-4 text-red-500 font-bold italic">
                <LogOut size={18} /> {t("dashboard.chiqish")}
              </Link>
            </div>
          </nav>
        </div>

        {/* OVERLAY */}
        {isOpen && (
          <div 
            onClick={toggleSidebar} 
            className="fixed inset-0 top-[100px] bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-500" 
          />
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-10 overflow-y-auto bg-gray-50 dark:bg-gray-950 transition-colors">
          <div className="max-w-5xl mx-auto">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}