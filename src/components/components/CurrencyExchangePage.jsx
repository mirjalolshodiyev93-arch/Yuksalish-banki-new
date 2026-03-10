import React from "react";
import { useNavigate } from "react-router-dom"; // 🔥 qo‘shildi

import CardImg from "../../assets/currency-card.png";

const currencies = [
  { code: "USD", buy: "10,200", sell: "10,250", color: "from-blue-600 to-blue-800", link: "/salom/usd" },
  { code: "EUR", buy: "11,500", sell: "11,550", color: "from-green-500 to-emerald-600", link: "/salom/eur" },
  { code: "GBP", buy: "13,000", sell: "13,050", color: "from-emerald-600 to-green-700", link: "/salom/gbp" },
  { code: "RUB", buy: "120", sell: "125", color: "from-green-700 to-green-800", link: "/salom/rub" },
];

export default function CurrencyExchangePage() {
  const navigate = useNavigate(); // 🔥 navigate funksiyasi

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-white via-green-50 to-green-200 pt-10 pb-20 px-6">

      {/* 🔥 ORQA YASHIL EFFEKT */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-400 rounded-full blur-[160px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>

      {/* HERO */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* LEFT TEXT */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            24/7 Onlayn <br /> Valyuta Ayirboshlash
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Eng qulay kurslarda, istalgan vaqtda valyutangizni almashtiring.
          </p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition">
              Ayirboshlash
            </button>

            <button className="bg-white px-8 py-3 rounded-xl font-semibold border shadow hover:bg-green-50 transition">
              Batafsil
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (FIXED) */}
        <div className="md:w-1/2 flex justify-center relative">
          
          {/* Soft glow background */}
          <div className="absolute w-[420px] h-[260px] bg-green-500 blur-3xl opacity-30 rounded-full"></div>

          {/* Card image */}
          <img
            src={CardImg}
            alt="Currency Card"
            className="relative w-[520px] drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-24">

        {/* Glass Container */}
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12 border border-white/40">

          {/* Soft background glow */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-400/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[120px]"></div>

          {/* Title */}
          <div className="text-center mb-14 relative">
            <h3 className="text-3xl font-bold text-gray-800">
              Eng so‘nggi kurslar
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">

            {currencies.map((c) => (
              <div
                key={c.code}
                onClick={() => navigate(c.link)} // 🔥 Bu yerda yo‘naltirish
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                
                {/* Header */}
                <div className={`bg-gradient-to-r ${c.color} text-white p-5 text-center`}>
                  <p className="text-xl font-bold tracking-wide">
                    {c.code}
                  </p>
                </div>

                {/* Body */}
                <div className="p-6 text-center">

                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500 text-sm">Sotib olish</span>
                    <span className="font-bold text-lg text-gray-800">
                      {c.buy}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-gray-500 text-sm">Sotish</span>
                    <span className="font-bold text-lg text-gray-800">
                      {c.sell}
                    </span>
                  </div>

                  {/* Small badge */}
                  <div className="mt-5">
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Real vaqt
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* PASTKI PROFESSIONAL TEXT */}
      <div className="relative z-10 max-w-4xl mx-auto mt-16 text-center">

        <p className="text-gray-600 text-lg leading-relaxed">
          Bizning onlayn valyuta ayirboshlash xizmati orqali siz
          <span className="font-semibold text-gray-800"> 24/7 rejimda </span>
          real vaqt kurslari asosida valyutani tez va xavfsiz tarzda
          almashtirishingiz mumkin.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700">
            ⚡ Tezkor operatsiya
          </div>
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700">
            🔒 Xavfsiz tizim
          </div>
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-gray-700">
            🌍 24/7 xizmat
          </div>
        </div>

      </div>
    </section>
  );
}