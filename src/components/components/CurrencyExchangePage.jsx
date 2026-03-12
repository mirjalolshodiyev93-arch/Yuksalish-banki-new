import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardImg from "../../assets/currency-card.png";

// Valyutalar ro'yxatini t funksiyasi orqali shakllantiramiz
const getCurrencies = (t) => [
  { 
    code: t("currencyExchange.list.usd.code"), 
    buy: t("currencyExchange.list.usd.buy"), 
    sell: t("currencyExchange.list.usd.sell"), 
    color: "from-blue-600 to-blue-800", 
    link: "/salom/usd" 
  },
  { 
    code: t("currencyExchange.list.eur.code"), 
    buy: t("currencyExchange.list.eur.buy"), 
    sell: t("currencyExchange.list.eur.sell"), 
    color: "from-green-500 to-emerald-600", 
    link: "/salom/eur" 
  },
  { 
    code: t("currencyExchange.list.gbp.code"), 
    buy: t("currencyExchange.list.gbp.buy"), 
    sell: t("currencyExchange.list.gbp.sell"), 
    color: "from-emerald-600 to-green-700", 
    link: "/salom/gbp" 
  },
  { 
    code: t("currencyExchange.list.rub.code"), 
    buy: t("currencyExchange.list.rub.buy"), 
    sell: t("currencyExchange.list.rub.sell"), 
    color: "from-green-700 to-green-800", 
    link: "/salom/rub" 
  },
];

export default function CurrencyExchangePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currencies = getCurrencies(t);

  const ratesRef = useRef(null); // 🔥 "Eng so‘nggi kurslar" bo‘limi uchun ref

  const handleScrollToRates = () => {
    if (ratesRef.current) {
      ratesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-white via-green-50 to-green-200 pt-10 pb-20 px-6">

      {/* ORQA YASHIL EFFEKT */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-400 rounded-full blur-[160px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>

      {/* HERO */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight whitespace-pre-line">
            {t("currencyExchange.hero.title")}
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            {t("currencyExchange.hero.subtitle")}
          </p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <button
              onClick={handleScrollToRates} // 🔥 Scroll funksiyasi
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition"
            >
              {t("currencyExchange.hero.btnExchange")}
            </button>

          </div>
        </div>

        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute w-[420px] h-[260px] bg-green-500 blur-3xl opacity-30 rounded-full"></div>
          <img
            src={CardImg}
            alt="Currency Card"
            className="relative w-[520px] drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* ENG SO‘NGGI KURSLAR BO‘LIMI */}
      <div ref={ratesRef} className="relative z-10 max-w-6xl mx-auto mt-24">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12 border border-white/40">

          <div className="text-center mb-14 relative">
            <h3 className="text-3xl font-bold text-gray-800">
              {t("currencyExchange.rates.title")}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {currencies.map((c) => (
              <div
                key={c.code}
                onClick={() => navigate(c.link)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className={`bg-gradient-to-r ${c.color} text-white p-5 text-center`}>
                  <p className="text-xl font-bold tracking-wide">{c.code}</p>
                </div>

                <div className="p-6 text-center">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500 text-sm">{t("currencyExchange.rates.buy")}</span>
                    <span className="font-bold text-lg text-gray-800">{c.buy}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-gray-500 text-sm">{t("currencyExchange.rates.sell")}</span>
                    <span className="font-bold text-lg text-gray-800">{c.sell}</span>
                  </div>

                  <div className="mt-5">
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {t("currencyExchange.rates.realTime")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PASTKI MATN */}
      <div className="relative z-10 max-w-4xl mx-auto mt-16 text-center">
        <p className="text-gray-600 text-lg leading-relaxed">
          {t("currencyExchange.features.description")}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700">
            {t("currencyExchange.features.fast")}
          </div>
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700">
            {t("currencyExchange.features.secure")}
          </div>
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700">
            {t("currencyExchange.features.anytime")}
          </div>
        </div>
      </div>
    </section>
  );
}