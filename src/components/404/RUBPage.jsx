import React, { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp, Globe, Loader2, X, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RUBPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  const buyRate = 153;
  const sellRate = 156;

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
    { day: t("usdPage.days.mon"), rate: 152 },
    { day: t("usdPage.days.tue"), rate: 154 },
    { day: t("usdPage.days.wed"), rate: 153 },
    { day: t("usdPage.days.thu"), rate: 155 },
    { day: t("usdPage.days.fri"), rate: 154 },
    { day: t("usdPage.days.sat"), rate: 156 },
    { day: t("usdPage.days.sun"), rate: 157 },
  ];

  const handleExchange = () => {
    setResult(amount * buyRate); 
    setIsModalOpen(true);        
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-500 bg-slate-50 dark:bg-gray-950">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={48} className="text-red-600 animate-spin" />
              <p className="font-medium text-slate-500 dark:text-gray-400 animate-pulse">RUB ma'lumotlari yuklanmoqda...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <section className="p-4 md:p-10">
          <div className="max-w-6xl mx-auto pt-[100px]">

          
            <div className="flex flex-col items-center justify-between gap-6 mb-10 md:flex-row" data-aos="fade-down">
              <div>
                <h1 className="flex items-center gap-3 text-4xl font-extrabold text-slate-900 dark:text-white">
                  <Globe className="text-red-600" /> {t('rubPage.title')}
                </h1>
                <p className="mt-2 text-slate-500 dark:text-gray-400">{t('rubPage.subtitle')}</p>
              </div>

              <div className="flex gap-8 px-6 py-4 bg-white border shadow-sm dark:bg-gray-900 rounded-3xl border-slate-100 dark:border-gray-800">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold tracking-widest">{t('rubPage.buy')}</p>
                  <p className="text-2xl font-black text-emerald-500">{buyRate.toLocaleString()} UZS</p>
                </div>
                <div className="w-[1px] bg-slate-100 dark:bg-gray-800"></div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold tracking-widest">{t('rubPage.sell')}</p>
                  <p className="text-2xl font-black text-red-500">{sellRate.toLocaleString()} UZS</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              
        
              <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-red-100/20 dark:shadow-none border border-red-50 dark:border-gray-800 h-fit" data-aos="fade-right">
                <h2 className="flex items-center gap-2 mb-8 text-xl font-bold dark:text-white">
                  <ArrowUpDown size={20} className="text-red-600" /> {t('rubPage.converter')}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-3 ml-1 text-xs font-bold uppercase text-slate-400 dark:text-gray-500">{t('rubPage.enterAmount')}</label>
                    <div className="relative">
                      <input
                        type="number"
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
                        className="w-full p-5 pr-16 text-2xl font-black transition-all border-2 border-transparent outline-none bg-slate-50 dark:bg-gray-800 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800 rounded-2xl dark:text-white"
                      />
                      <span className="absolute font-bold tracking-tighter -translate-y-1/2 pointer-events-none right-5 top-1/2 text-slate-400">RUB</span>
                    </div>
                  </div>

                  <div className="p-5 border border-red-100 bg-red-50 dark:bg-red-900/20 rounded-2xl dark:border-red-800/30">
                    <p className="text-xs font-bold tracking-wider text-red-600 uppercase dark:text-red-400">{t('rubPage.youGet') || "Siz olasiz"}:</p>
                    <p className="mt-2 text-3xl font-black leading-tight text-red-800 break-words dark:text-red-300">{(amount * buyRate).toLocaleString()} <span className="text-sm font-medium tracking-normal opacity-70">UZS</span></p>
                  </div>

                  <button
                    onClick={handleExchange}
                    className="w-full py-5 text-sm font-black tracking-widest text-white uppercase transition-all bg-red-600 shadow-lg hover:bg-red-700 rounded-2xl active:scale-95 shadow-red-200 dark:shadow-none"
                  >
                    {t('rubPage.exchange')}
                  </button>
                </div>
              </div>

    
              <div className="lg:col-span-2" data-aos="fade-left">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-800 h-full min-h-[400px]">
                  <h3 className="flex items-center gap-2 mb-8 font-bold text-slate-800 dark:text-white">
                    <TrendingUp size={18} className="text-red-600" /> {t('rubPage.weeklyRate')}
                  </h3>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorRUB" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
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
                        <YAxis hide domain={["dataMin - 5", "dataMax + 5"]}/>
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "20px", 
                            border: "none", 
                            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                            backgroundColor: "#1e293b",
                            color: "#fff"
                          }}
                          itemStyle={{ color: "#f87171", fontWeight: "bold" }}
                        />
                        <Area type="monotone" dataKey="rate" stroke="#dc2626" strokeWidth={4} fillOpacity={1} fill="url(#colorRUB)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>

    
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
                    
                    <div className="flex items-center justify-center w-16 h-16 mb-6 text-red-600 bg-red-100 dark:bg-red-900/30 rounded-2xl">
                      <CheckCircle2 size={32} />
                    </div>

                    <h2 className="mb-2 text-2xl font-black dark:text-white">{t("rubPage.modalTitle")}</h2>
                    <p className="mb-6 text-sm text-slate-500 dark:text-gray-400">{t("rubPage.modalText")}</p>
                    
                    <div className="p-6 mb-8 text-center border bg-slate-50 dark:bg-gray-800 rounded-2xl border-slate-100 dark:border-gray-700">
                      <p className="text-3xl font-black text-red-600 dark:text-red-400">{result ? result.toLocaleString() : 0} <span className="text-lg">UZS</span></p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        className="w-full py-4 font-bold text-white transition-all bg-red-600 rounded-2xl hover:bg-red-700"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("rubPage.confirm")}
                      </button>
                      <button
                        className="w-full py-4 font-bold transition-all text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-2xl"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("rubPage.cancel")}
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