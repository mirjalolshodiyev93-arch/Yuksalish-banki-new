import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, Loader2 } from "lucide-react"; 
import CardImg from "../../assets/currency-card.png";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const getCurrencies = (t) => [
  { code: "USD", buy: t("currencyExchange.list.usd.buy"), sell: t("currencyExchange.list.usd.sell"), color: "bg-emerald-500", link: "/salom/usd" },
  { code: "EUR", buy: t("currencyExchange.list.eur.buy"), sell: t("currencyExchange.list.eur.sell"), color: "bg-blue-500", link: "/salom/eur" },
  { code: "GBP", buy: t("currencyExchange.list.gbp.buy"), sell: t("currencyExchange.list.gbp.sell"), color: "bg-indigo-500", link: "/salom/gbp" },
  { code: "RUB", buy: t("currencyExchange.list.rub.buy"), sell: t("currencyExchange.list.rub.sell"), color: "bg-rose-500", link: "/salom/rub" },
];

export default function CurrencyExchangePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currencies = getCurrencies(t);
  const ratesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-back" });
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => AOS.refreshHard(), 100);
    }
  }, [isLoading]);

  const handleScrollToRates = () => {
    ratesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-950 transition-colors duration-500">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-emerald-600 animate-spin" />
              <p className="font-medium text-slate-500 dark:text-gray-400 animate-pulse">Kurslar yangilanmoqda...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <section className="relative min-h-screen px-6 pt-16 pb-24 overflow-hidden">
          
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-200 dark:bg-emerald-900 rounded-full blur-[120px] opacity-40 dark:opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-emerald-100 dark:bg-green-900 rounded-full blur-[100px] opacity-50 dark:opacity-10"></div>

          
          <div className="relative z-10 flex flex-col items-center justify-between gap-12 mx-auto max-w-7xl lg:flex-row lg:gap-20">
            <div className="text-center lg:w-1/2 lg:text-left" data-aos="fade-right">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                ✨ {t("currencyExchange.rates.realTime")}
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                {t("currencyExchange.hero.title").split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>

              <p className="max-w-xl mt-8 text-lg leading-relaxed text-slate-600 dark:text-gray-400 lg:text-xl">
                {t("currencyExchange.hero.subtitle")}
              </p>

              <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row lg:justify-start">
                <button
                  onClick={handleScrollToRates}
                  className="group relative px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-[0_20px_40px_-12px_rgba(16,185,129,0.35)] hover:bg-emerald-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  {t("currencyExchange.hero.btnExchange")}
                  <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>

            <div className="relative flex justify-center lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
              <div className="absolute inset-0 bg-emerald-400 blur-[100px] opacity-10 rounded-full scale-75"></div>
              <img
                src={CardImg}
                alt="Currency Card"
                className="relative w-full max-w-[550px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] hover:rotate-2 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        
          <div ref={ratesRef} className="relative z-10 mx-auto mt-32 max-w-7xl">
            <div className="flex flex-col items-end justify-between gap-6 px-4 mb-12 text-center md:flex-row md:text-left" data-aos="fade-up">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {t("currencyExchange.rates.title")}
                </h3>
                <p className="flex items-center justify-center gap-2 mt-2 text-slate-500 dark:text-gray-400 md:justify-start">
                  <RefreshCcw size={16} className="animate-spin-slow text-emerald-500" />
                  Oxirgi yangilanish: Hozirgina
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {currencies.map((c, index) => (
                <div
                  key={c.code}
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 100}
                  onClick={() => navigate(c.link)}
                  className="group cursor-pointer relative bg-white dark:bg-gray-900 rounded-[32px] p-2 border border-slate-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="bg-slate-50 dark:bg-gray-800/50 rounded-[26px] p-6 h-full border border-transparent group-hover:border-emerald-100 dark:group-hover:border-emerald-900 transition-colors">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-12 h-12 ${c.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {c.code.substring(0, 1)}
                      </div>
                      <span className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">{c.code}</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white border dark:bg-gray-800 rounded-xl border-slate-50 dark:border-gray-700">
                        <span className="text-xs font-semibold uppercase text-slate-400 dark:text-gray-500">{t("currencyExchange.rates.buy")}</span>
                        <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-gray-200">
                          <ArrowDownLeft size={14} className="text-emerald-500" /> {c.buy}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white border dark:bg-gray-800 rounded-xl border-slate-50 dark:border-gray-700">
                        <span className="text-xs font-semibold uppercase text-slate-400 dark:text-gray-500">{t("currencyExchange.rates.sell")}</span>
                        <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-gray-200">
                          <ArrowUpRight size={14} className="text-rose-500" /> {c.sell}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full py-2 mt-6 text-xs font-bold text-center transition-opacity rounded-lg opacity-0 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 group-hover:opacity-100">
                      Ayirboshlash →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      
          <div className="relative z-10 max-w-5xl mx-auto mt-24" data-aos="fade-up">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { label: t("currencyExchange.features.fast"), icon: "" },
                { label: t("currencyExchange.features.secure"), icon: "" },
                { label: t("currencyExchange.features.anytime"), icon: "" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 transition-colors border border-white shadow-sm bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-slate-700 dark:text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="max-w-2xl mx-auto mt-12 italic leading-relaxed text-center text-slate-500 dark:text-gray-500">
              "{t("currencyExchange.features.description")}"
            </p>
          </div>
        </section>
      )}
    </div>
  );
}