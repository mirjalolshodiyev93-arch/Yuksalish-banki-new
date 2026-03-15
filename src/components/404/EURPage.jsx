import React, { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp, Globe, Loader2, X, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EURPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  const buyRate = 14850;
  const sellRate = 14087;

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

  const chartData = [
    { day: t("eurPage.days.mon"), rate: 13800 },
    { day: t("eurPage.days.tue"), rate: 13850 },
    { day: t("eurPage.days.wed"), rate: 13790 },
    { day: t("eurPage.days.thu"), rate: 13920 },
    { day: t("eurPage.days.fri"), rate: 14010 },
    { day: t("eurPage.days.sat"), rate: 13980 },
    { day: t("eurPage.days.sun"), rate: 14050 },
  ];

  const handleExchange = () => {
    setResult(amount * buyRate); 
    setIsModalOpen(true);        
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-500 font-sans">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-indigo-600 animate-spin" />
              <p className="text-slate-500 dark:text-gray-400 font-medium animate-pulse">EUR ma'lumotlari yuklanmoqda...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <section className="p-4 md:p-10">
          <div className="max-w-6xl mx-auto pt-[100px]">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6" data-aos="fade-down">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                  <Globe className="text-indigo-600" /> {t("eurPage.title")}
                </h1>
                <p className="text-slate-500 dark:text-gray-400 mt-2">{t("eurPage.subtitle")}</p>
              </div>

              <div className="bg-white dark:bg-gray-900 px-6 py-4 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-800 flex gap-8">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold tracking-widest">{t("eurPage.buy")}</p>
                  <p className="text-2xl font-black text-emerald-500">{buyRate.toLocaleString()} UZS</p>
                </div>
                <div className="w-[1px] bg-slate-100 dark:bg-gray-800"></div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold tracking-widest">{t("eurPage.sell")}</p>
                  <p className="text-2xl font-black text-indigo-500">{sellRate.toLocaleString()} UZS</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* CONVERTER */}
              <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/20 dark:shadow-none border border-indigo-50 dark:border-gray-800 h-fit" data-aos="fade-right">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-2 dark:text-white">
                  <ArrowUpDown size={20} className="text-indigo-500" /> {t("eurPage.converter")}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-gray-500 uppercase mb-3 ml-1">{t("eurPage.enterAmount")}</label>
                    <div className="relative">
                      <input
                        type="number"
                        // Nolni tozalash mantiqi
                        value={amount === 0 ? "" : amount}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val === "") {
                            setAmount(0);
                            return;
                          }
                          let cleanVal = val.replace(/\D/g, "");
                          if (cleanVal.length > 7) cleanVal = cleanVal.slice(0, 7);
                          setAmount(Number(cleanVal));
                        }}
                        placeholder="0"
                        className="w-full pr-16 p-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-800 rounded-2xl outline-none transition-all text-2xl font-black dark:text-white"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold pointer-events-none tracking-tighter">EUR</span>
                    </div>
                  </div>

                  <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">{t("eurPage.youGet")}</p>
                    <p className="text-3xl font-black text-indigo-800 dark:text-indigo-300 mt-2 break-words leading-tight">{(amount * buyRate).toLocaleString()} <span className="text-sm font-medium opacity-70 tracking-normal">UZS</span></p>
                  </div>

                  <button
                    onClick={handleExchange}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none uppercase tracking-widest text-sm"
                  >
                    {t("eurPage.exchange")}
                  </button>
                </div>
              </div>

              {/* CHART */}
              <div className="lg:col-span-2" data-aos="fade-left">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-800 h-full min-h-[400px]">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-8">
                    <TrendingUp size={18} className="text-indigo-500" /> {t("eurPage.weeklyRate")}
                  </h3>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorEUR" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                        <XAxis 
                           dataKey="day" 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }} 
                           dy={10}
                        />
                        <YAxis hide domain={["dataMin - 100", "dataMax + 100"]}/>
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "20px", 
                            border: "none", 
                            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                            backgroundColor: "#1e293b",
                            color: "#fff"
                          }}
                          itemStyle={{ color: "#818cf8", fontWeight: "bold" }}
                        />
                        <Area type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorEUR)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>

            {/* MODAL */}
            <AnimatePresence>
              {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={() => setIsModalOpen(false)} 
                    className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm" 
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                    animate={{ scale: 1, opacity: 1, y: 0 }} 
                    exit={{ scale: 0.9, opacity: 0, y: 20 }} 
                    className="relative bg-white dark:bg-gray-900 p-8 rounded-[3rem] max-w-md w-full shadow-2xl overflow-hidden"
                  >
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"><X size={24}/></button>
                    
                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} />
                    </div>

                    <h2 className="text-2xl font-black mb-2 dark:text-white">{t("eurPage.modalTitle")}</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">{t("eurPage.modalText")}</p>
                    
                    <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 mb-8 text-center">
                      <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{result ? result.toLocaleString() : 0} <span className="text-lg">UZS</span></p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("eurPage.confirm")}
                      </button>
                      <button
                        className="w-full py-4 text-slate-500 dark:text-gray-400 font-bold hover:bg-slate-100 dark:hover:bg-gray-800 rounded-2xl transition-all"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("eurPage.cancel")}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </section>
      )}
    </div>
  );
}