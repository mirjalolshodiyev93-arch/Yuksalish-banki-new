import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const depositTypes = [
  {
    id: 1,
    title: "Onlayn Omonat",
    rate: "22%",
    term: "12 oy",
    minAmount: "500 000 so'm",
    color: "bg-green-50"
  },
  {
    id: 2,
    title: "Maksimal Daromad",
    rate: "25%",
    term: "24 oy",
    minAmount: "1 000 000 so'm",
    color: "bg-blue-50"
  },
  {
    id: 3,
    title: "Erkin Jamg'arma",
    rate: "18%",
    term: "6 oy",
    minAmount: "100 000 so'm",
    color: "bg-orange-50"
  }
];

export default function Deposits() {
  const [amount, setAmount] = useState(1000000);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-12 md:py-20 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Omonatlar (Depozitlar)
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Mablag‘laringizni ishonchli va yuqori daromad bilan ko‘paytiring. 
            Biz bilan kelajagingizni bugundan rejalashtiring.
          </p>
        </div>
      </section>

      {/* Deposit List */}
      <section className="py-10 md:py-16 bg-gray-50 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-gray-800">
            Omonat turlari
          </h2>
          {/* Mobil: 1 ustun, Planshet: 2 ustun, Kompyuter: 3 ustun */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {depositTypes.map((item) => (
              <div 
                key={item.id} 
                className={`${item.color} p-6 md:p-8 rounded-3xl border border-gray-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.title}</h3>
                  <div className="my-4 md:my-6">
                    <span className="text-3xl md:text-4xl font-black text-green-600">{item.rate}</span>
                    <span className="text-gray-500 ml-2 text-sm md:text-base">yillik</span>
                  </div>
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base text-gray-600 font-medium">
                    <li className="flex items-center">
                      <span className="mr-2">🗓</span> Muddat: <b>{item.term}</b>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">💰</span> Minimal: <b>{item.minAmount}</b>
                    </li>
                    <li className="flex items-center text-green-700">
                      <span className="mr-2">✅</span> Qisman yechish imkoniyati
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => navigate("/omonat/deposits")}
                  className="w-full bg-green-600 text-white py-3 md:py-4 rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all text-sm md:text-base"
                >
                  Omonat ochish
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-[800px] mx-auto bg-white border border-green-100 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-green-100/50">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-gray-800">
            Daromadingizni hisoblang
          </h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm md:text-base font-semibold text-gray-700 italic">Sarmoya miqdori:</label>
                <span className="text-lg md:text-xl font-bold text-green-600">{amount.toLocaleString()} so'm</span>
              </div>
              <input 
                type="range" 
                min="1000000" 
                max="500000000" 
                step="1000000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>
            {/* Kalkulyator natijalari - Mobilda ustun, kattada qator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div className="text-center sm:text-left">
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-1">Yillik sof foyda (25%):</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{(amount * 0.25).toLocaleString()} so'm</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-1">Jami qaytariladi:</p>
                <p className="text-xl md:text-2xl font-bold text-slate-800">{(amount * 1.25).toLocaleString()} so'm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (Call to Action) */}
      <section className="bg-green-600 py-10 md:py-14 px-4 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Savollaringiz bormi? <br className="md:hidden" /> Mutaxassis bilan bog'laning
          </h2>
          <Link 
            to="/contact" 
            className="w-full sm:w-auto bg-white text-green-600 px-10 py-3 md:py-4 rounded-full font-bold hover:bg-gray-100 active:scale-95 transition-all inline-block shadow-lg"
          >
            Bog'lanish
          </Link>
        </div>
      </section>
    </div>
  );
}