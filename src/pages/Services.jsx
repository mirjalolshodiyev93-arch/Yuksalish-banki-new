import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// services funksiya sifatida import qilinadi
import { services as getServices } from "../data/homeData"; 

export default function Service() {
  const { t } = useTranslation();
  
  const [income, setIncome] = useState(2000);
  const [term, setTerm] = useState(6);
  const [rate, setRate] = useState(7.5);
  const [total, setTotal] = useState(income * (1 + rate / 100));

  // 1. Rasmlar chiqishi uchun eng to'g'ri yo'li:
  // homeData dagi funksiyaga t ni uzatib, tayyor obyektlar massivini olamiz.
  const translatedServices = getServices(t);

  useEffect(() => {
    setTotal(income + (income * rate) / 100);
  }, [income, rate]);

  const plans = [
    { value: 7.5, label: "Invest 7.5" },
    { value: 10, label: "Invest 10" },
    { value: 15, label: "Premium 15" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto bg-white text-gray-900">
      
      {/* HERO SECTION */}
      <div
        className="h-[450px] bg-cover bg-center relative flex items-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1554224155-6726b3ff858f)",
        }}
      >
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="relative px-16">
          <h1 className="text-5xl font-bold leading-tight mb-4 text-gray-900">
            {t("hero.hero_title")} <br />
            <span className="text-blue-600">{t("hero.hero_subtitle")}</span>
          </h1>
          <p className="text-black max-w-lg">
            {t("hero.hero_desc",)}
          </p>
        </div>
      </div>

      {/* SERVICES GRID - Endi rasmlar aniq chiqadi */}
      <div className="px-6 grid py-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
        {translatedServices.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition duration-300"
          >
            <div className="h-48 overflow-hidden bg-gray-100">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                // Rasm yuklanmasa xato bermasligi uchun fallback
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Bank+Service'; }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <button className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl text-sm text-white transition">
                {item.btn}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CALCULATOR SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 bg-slate-100 rounded-[3rem] mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="bg-white rounded-3xl p-12 shadow-md border border-gray-200">
            <h3 className="text-3xl font-semibold mb-10">
              {t("xizmatlar.calc_title")}
            </h3>

            <div className="mb-10">
              <label className="text-gray-600 text-sm">{t("xizmatlar.calc_amount")}</label>
              <div className="mt-3 border rounded-xl px-4 py-4 text-xl font-medium bg-gray-50">
                {income.toLocaleString()} USD
              </div>
              <input
                type="range"
                min={200}
                max={100000}
                step={100}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full mt-4 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-10 shadow-md border border-gray-200 flex flex-col justify-center">
             <div className="space-y-6">
                <div>
                   <p className="text-gray-600 text-sm font-medium">{t("xizmatlar.calc_total")}</p>
                   <div className="bg-blue-50 text-blue-700 rounded-xl px-4 py-4 mt-2 text-2xl font-bold">
                     {total.toFixed(2).toLocaleString()} USD
                   </div>
                </div>
                
                <div className="pt-4 border-t border-dashed">
                   <p className="text-gray-600 text-sm font-medium">{t("xizmatlar.calc_profit",)}</p>
                   <div className="text-green-600 text-2xl font-bold mt-1">
                     +{(total - income).toFixed(2)} USD
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}