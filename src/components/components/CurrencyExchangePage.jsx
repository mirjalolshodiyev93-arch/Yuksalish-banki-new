import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from "lucide-react"; 
import CardImg from "../../assets/currency-card.png";

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

  const handleScrollToRates = () => {
    ratesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#F8FAFC] pt-16 pb-24 px-6">
      

      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-200 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[100px] opacity-50"></div>

     
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
            ✨ {t("currencyExchange.rates.realTime")}
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            {t("currencyExchange.hero.title").split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>

          <p className="mt-8 text-slate-600 text-lg lg:text-xl max-w-xl leading-relaxed">
            {t("currencyExchange.hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handleScrollToRates}
              className="group relative px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-[0_20px_40px_-12px_rgba(16,185,129,0.35)] hover:bg-emerald-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              {t("currencyExchange.hero.btnExchange")}
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center relative perspective-1000">
          <div className="absolute inset-0 bg-emerald-400 blur-[100px] opacity-10 rounded-full scale-75"></div>
          <img
            src={CardImg}
            alt="Currency Card"
            className="relative w-full max-w-[550px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] hover:rotate-2 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

     
      <div ref={ratesRef} className="relative z-10 max-w-7xl mx-auto mt-32">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 text-center md:text-left px-4">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t("currencyExchange.rates.title")}
            </h3>
            <p className="text-slate-500 mt-2 flex items-center justify-center md:justify-start gap-2">
              <RefreshCcw size={16} className="animate-spin-slow text-emerald-500" />
              Oxirgi yangilanish: Hozirgina
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currencies.map((c) => (
            <div
              key={c.code}
              onClick={() => navigate(c.link)}
              className="group cursor-pointer relative bg-white rounded-[32px] p-2 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="bg-slate-50 rounded-[26px] p-6 h-full border border-transparent group-hover:border-emerald-100 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 ${c.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {c.code.substring(0, 1)}
                  </div>
                  <span className="text-2xl font-black text-slate-800 tracking-tighter">{c.code}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-50">
                    <span className="text-slate-400 text-xs font-semibold uppercase">{t("currencyExchange.rates.buy")}</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <ArrowDownLeft size={14} className="text-emerald-500" /> {c.buy}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-50">
                    <span className="text-slate-400 text-xs font-semibold uppercase">{t("currencyExchange.rates.sell")}</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <ArrowUpRight size={14} className="text-rose-500" /> {c.sell}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 w-full py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Ayirboshlash →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     <div className="relative z-10 max-w-5xl mx-auto mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: t("currencyExchange.features.fast"), icon: " " },
            { label: t("currencyExchange.features.secure"), icon: " " },
            { label: t("currencyExchange.features.anytime"), icon: " " }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white shadow-sm hover:bg-white transition-colors">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-12 text-slate-500 text-center max-w-2xl mx-auto leading-relaxed italic">
          "{t("currencyExchange.features.description")}"
        </p>
      </div>
    </section>
  );
}