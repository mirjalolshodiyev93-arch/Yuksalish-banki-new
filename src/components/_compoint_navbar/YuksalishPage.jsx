import React from 'react';
import { useTranslation } from "react-i18next";

import img10 from "../../assets/img10.png";
import img9 from "../../assets/rasm.jpg";

// Instagram section
const TelegramSection = () => {

  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center bg-[#f8fafc] p-6 md:p-8 rounded-[35px] w-full lg:w-[360px] text-center shadow-sm border border-gray-100">

      <div className="relative mb-8 transform hover:-translate-y-2 transition-transform duration-500">
        <div className="w-[170px] md:w-[190px] h-[340px] md:h-[380px] bg-white rounded-[35px] border-6 border-[#1e293b] shadow-2xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={img9}
            alt="Instagram preview"
          />
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6 md:mb-8 leading-snug">
        {t("promo.instagram_title")}
      </h3>

      <a
        href="https://www.instagram.com/_mirjalo0l_developer_/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-85 transition-opacity"
      >
        <button className="bg-[#008141] hover:bg-[#006b35] text-white font-bold py-3 px-8 md:py-3.5 md:px-10 rounded-xl transition-all shadow-lg active:scale-95">
          {t("promo.subscribe")}
        </button>
      </a>
    </div>
  );
};


// App promo
const AppPromoSection = () => {

  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-[#f8fafc] p-6 md:p-10 rounded-[35px] flex-1 shadow-sm border border-gray-100 overflow-hidden">

      <div className="relative w-full lg:w-1/2 h-[250px] md:h-[350px] lg:h-[420px] flex items-center justify-center mb-8 lg:mb-0">
        <img
          className="w-full h-full object-contain"
          src={img10}
          alt="Yuksalish app"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#008141] mb-3">
          {t("promo.bank_name")}
        </h2>

        <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-10 font-medium">
          {t("promo.app_download")}
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.hamkorbank.mobile"
            className="hover:opacity-85 transition-opacity"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.hamkorbank.mobile"
            className="hover:opacity-85 transition-opacity"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 md:h-12 w-auto"
            />
          </a>
        </div>
      </div>

    </div>
  );
};


// MAIN PAGE
export default function YuksalishPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 lg:p-12 font-sans">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-6 md:gap-8">
        <TelegramSection />
        <AppPromoSection />
      </div>
    </div>
  );
}