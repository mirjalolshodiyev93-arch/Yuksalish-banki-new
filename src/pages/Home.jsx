import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Komponentlar importi
import ServiceCard from "../components/_compoint_/ServiceCard";
import Bank from "../components/skroll/Bank";
import Stats from "../components/_compoint_/Stats";
import Hero from "../components/components/Hero";
import Hero1 from "../components/_compoint_navbar/YuksalishPage";
import { Testimonials } from "./Testimonials";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Sahifa komponentlari yuklanishi uchun vaqt (simulyatsiya)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // 1.8 soniya - Home sahifa og'irroq bo'lgani uchun biroz ko'proq

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          /* --- FULL SCREEN HOME LOADER --- */
          <motion.div
            key="home-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white dark:bg-slate-950"
          >
            {/* Elegant Spinner */}
            <div className="relative w-24 h-24">
              {/* Markaziy logo o'rni yoki ikonka */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
              </div>
              
              {/* Aylanuvchi chiziqlar */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-b-4 border-emerald-600 rounded-full"
              ></motion.div>
              
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-2 border-r-4 border-l-4 border-slate-200 dark:border-slate-800 rounded-full"
              ></motion.div>
            </div>

            {/* Yuklanish matni */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-center"
            >
              <h2 className="text-xl font-black tracking-[0.4em] uppercase text-slate-800 dark:text-white">
                {t("loading") || "ASR BANK"}
              </h2>
              <p className="mt-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
                Xavfsiz bank tizimi yuklanmoqda...
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* --- ASOSIY SAHIFA KONTENTI --- */
          <motion.main
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Stats />
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Bank />
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ServiceCard />
            </motion.div>

            <Testimonials />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Hero1 />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}