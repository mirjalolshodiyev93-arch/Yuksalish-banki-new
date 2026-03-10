// src/pages/Batafsil.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OpenAccount() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
      {/* Orqa tugma */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
      >
        Orqaga
      </button>

      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Batafsil Ma'lumot</h1>
        <p className="text-gray-700 mb-4">
          Yuksalish Bank sizga eng yaxshi moliyaviy xizmatlarni taqdim etadi. 
          Hisob ochish, kredit va depozit xizmatlari bilan bir qatorda, 
          sizning moliyaviy xavfsizligingizni ham ta’minlaymiz.
        </p>
        <p className="text-gray-700 mb-4">
          Bank kartalari, onlayn banking, mobil ilovalar va boshqa 
          innovatsion yechimlar yordamida siz oson va tezkor moliyaviy operatsiyalarni amalga oshirishingiz mumkin.
        </p>
        <p className="text-gray-700 mb-4">
          Batafsil xizmatlarimiz va tariflarimiz bilan tanishish uchun siz sahifani pastga aylantiring yoki “Xizmatlar” bo‘limiga o‘ting.
        </p>

        {/* Batafsil rasmlar yoki kartalar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Onlayn Banking</h3>
            <p className="text-gray-600">Har doim va har yerda hisobingizni nazorat qiling.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Kredit Xizmatlari</h3>
            <p className="text-gray-600">Moslashuvchan shartlar bilan kredit oling.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Depozitlar</h3>
            <p className="text-gray-600">Daromadingizni xavfsiz joyda saqlang va oshiring.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Mobil Ilova</h3>
            <p className="text-gray-600">Har doim qulay va tezkor banking tajribasi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}