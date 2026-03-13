import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { services as getServices } from "../data/homeData"; 
import { Link } from "react-router-dom";

export default function Service() {
  const { t } = useTranslation();
  
  const [income, setIncome] = useState(2000);
  const [rate, setRate] = useState(7.5);
  const [total, setTotal] = useState(income * (1 + rate / 100));

  const translatedServices = getServices(t);

  useEffect(() => {
    setTotal(income + (income * rate) / 100);
  }, [income, rate]);

  return (
    <div className="w-full min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
   
      {/* HERO SECTION */}
      <div className="relative h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f" 
            className="object-cover w-full h-full opacity-20 dark:opacity-10 dark:grayscale" 
            alt="background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-950"></div>
        </div>

        <div className="relative z-10 px-6 max-w-[1400px] mx-auto w-full">
          <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl text-slate-800 dark:text-white">
            {t("hero.hero_title")} <br />
            <span className="text-emerald-600 dark:text-emerald-500">{t("hero.hero_subtitle")}</span>
          </h1>
          <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">
            {t("hero.hero_desc")}
          </p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="max-w-[1400px] mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {translatedServices.map((item) => (
          <Link to={item.link} key={item.id} className="group">
            <div className="h-full rounded-[2.5rem] overflow-hidden border border-emerald-50 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20 transition-all duration-500 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transition duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Bank+Service'; }}
                />
                <div className="absolute inset-0 transition-colors bg-emerald-900/10 group-hover:bg-transparent"></div>
              </div>
              
              <div className="flex flex-col flex-grow p-8">
                <h3 className="mb-4 text-2xl font-bold transition-colors text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {item.title}
                </h3>
                <p className="mb-8 font-medium text-slate-500 dark:text-slate-400 line-clamp-3">
                  {item.desc}
                </p>
                <div className="mt-auto">
                  <button className="w-full py-4 font-bold text-white transition-all shadow-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-2xl shadow-emerald-100 dark:shadow-none active:scale-95">
                    {item.btn}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CALCULATOR SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 py-10 ">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[3.5rem] p-8 md:p-16 border border-white dark:border-slate-800 shadow-inner">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            
            <div>
              <h3 className="mb-8 text-3xl font-black text-slate-800 dark:text-white">
                {t("xizmatlar.calc_title")}
              </h3>

              <div className="space-y-8">
                <div className="relative">
                  <div className="flex items-end justify-between mb-4">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                      {t("xizmatlar.calc_amount")}
                    </label>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {income.toLocaleString()} <span className="text-sm">USD</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={100000}
                    step={100}
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-100 dark:bg-slate-800 accent-emerald-600 dark:accent-emerald-500"
                  />
                </div>
                
                <div className="flex gap-4">
                   {[7.5, 10, 15].map((v) => (
                     <button 
                      key={v}
                      onClick={() => setRate(v)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${rate === v ? 'bg-emerald-600 dark:bg-emerald-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'}`}
                     >
                       {v}% Plan
                     </button>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-emerald-900/5 dark:shadow-none border border-emerald-50 dark:border-slate-800">
              <div className="space-y-8">
                <div>
                  <p className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                    {t("xizmatlar.calc_total")}
                  </p>
                  <div className="text-4xl font-black md:text-5xl text-slate-800 dark:text-white">
                    {total.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xl">USD</span>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <p className="mb-2 text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                    {t("xizmatlar.calc_profit")}
                  </p>
                  <div className="inline-flex items-center px-4 py-2 text-xl font-bold rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <span className="mr-1">+</span>
                    {(total - income).toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}