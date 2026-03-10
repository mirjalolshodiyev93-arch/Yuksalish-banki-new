import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OpenDeposit() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Deposits sahifasidan kelgan ma'lumotni olish (omonat nomi)
  const selectedDeposit = location.state?.depositName || "Tanlanmagan";

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Arizangiz qabul qilindi! Tez orada operatorlarimiz bog'lanishadi.");
    navigate("/omonat/deposits");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-[600px] mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="text-green-600 mb-6 flex items-center hover:underline"
        >
          ← Orqaga qaytish
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Omonat ochish</h2>
        <p className="text-gray-500 mb-8">Tanlangan tur: <span className="font-bold text-green-600">{selectedDeposit}</span></p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To'liq ism-sharifingiz</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Masalan: Azizbek Ahmedov"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqamingiz</label>
            <input 
              required
              type="tel" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="+998 90 123 45 67"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxminiy sarmoya miqdori (so'm)</label>
            <input 
              required
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="1 000 000"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
            ℹ️ Arizani yuborganingizdan so'ng, mutaxassisimiz shartnomani rasmiylashtirish uchun siz bilan bog'lanadi.
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200"
          >
            Arizani yuborish
          </button>
        </form>
      </div>
    </div>
  );
}

