import React from 'react';
import img10 from "../../assets/img10.png"
import img9 from "../../assets/rasm.jpg";
// 1. Telegram Komponenti (Chap tomondagi qism)
const TelegramSection = () => (
  <div className="flex flex-col items-center bg-[#f8fafc] p-8 rounded-[35px] w-full lg:w-[360px] text-center shadow-sm border border-gray-100">
    <div className="relative mb-8 transform hover:-translate-y-2 transition-transform duration-500">
      {/* Telefon ramkasi */}
      <div className="w-[190px] h-[380px] bg-white rounded-[35px] border-6 border-[#1e293b] shadow-2xl overflow-hidden relative">
        <img
          className="w-full h-full object-cover"
          src={img9}
          alt="Card Image"
        />
      </div>
      
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-8 leading-snug">
      Yuksalish bank Istagramga obuna bo'ling
    </h3>
   <a href="https://www.instagram.com/_mirjalo0l_developer_/" target="_blank" rel="noopener noreferrer" className="hover:opacity-85 transition-opacity">
  <button className="bg-[#008141] hover:bg-[#006b35] text-white font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg active:scale-95">
    Obuna bo'lish
  </button>
</a>
  </div>
);

// 2. Mobil Ilova Komponenti (O'ng tomondagi qism)
const AppPromoSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-between bg-[#f8fafc] p-10 md:p-16 rounded-[35px] flex-1 shadow-sm border border-gray-100 overflow-hidden">
    {/* Telefonlar vizuali */}
    <div className="relative flex items-center justify-center w-[600px] md:w-1/2 h-[500px]">
      <img className='h-full w-full' src={img10} alt="" />
    </div>

    {/* Ma'lumot qismi */}
    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#008141] mb-3">
        Yuksalish bank
      </h2>
      <p className="text-xl md:text-2xl text-gray-500 mb-10 font-medium">
        Mobil ilovasini yuklab oling!
      </p>
      <div className="flex gap-4">
        <a href="https://play.google.com/store/apps/details?id=com.hamkorbank.mobile" className="hover:opacity-85 transition-opacity">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12 w-auto" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.hamkorbank.mobile" className="hover:opacity-85 transition-opacity">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12 w-auto" />
        </a>
      </div>
    </div>
  </div>
);

// Asosiy sahifa
export default function YuksalishPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8">
        <TelegramSection />
        <AppPromoSection />
      </div>
    </div>
  );
}